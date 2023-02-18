import { useEffect, useRef, useState} from "preact/hooks";
import {Runtime} from "../vm/runtime";
import * as constants from '../vm/constants';
import useKeyboardEvents from "./use-keyboard-events";
import useMouseEvents from "./use-mouse-events";
import { useStore } from '@nanostores/preact';
import { inpustStore } from '../stores/input-store';

type TUseWasmCartProps = {
  withKeyboard: boolean;
  withMouse: boolean;
  cartName: string;
};

type TUseWasmCart = (props: TUseWasmCartProps) => {
  pause: boolean;
  loading: boolean;
  setPause: (value: boolean) => void;
  launchCart: () => void;
  resetCart: () => Promise<void>;
  canvas?: HTMLCanvasElement;
};

const useWasmCart: TUseWasmCart = ({ withKeyboard, withMouse, cartName }) => {
  const timeNextUpdateRef = useRef(0);
  const reqRef = useRef(0); 

  const inputState = useStore(inpustStore);
  const {initKeyboardEvents} = useKeyboardEvents();
  const {initMouseEvents} = useMouseEvents();

  const [loading, setLoading] = useState(true);
  const [pause, setPause] = useState(false);
  const [runtime, setRuntime] = useState<Runtime | null>(null);
  const [canvasEl, setCanvasEl] = useState<HTMLCanvasElement | undefined>();

  useEffect(() => {
    timeNextUpdateRef.current = performance.now();
    init();
  }, []);

  useEffect(() => {
    if (runtime && !pause) reqRef.current = requestAnimationFrame(update);
    if (pause) cancelAnimationFrame(reqRef.current);
    return () => cancelAnimationFrame(reqRef.current);
  }, [runtime, pause])

  const init = async () => {
    const runtime = new Runtime(`pwasm4-${cartName}`);

    async function loadCartWasm(): Promise<Uint8Array> {
      const cartUrl = `carts/${cartName}.wasm`;
      const res = await fetch(cartUrl);
      return new Uint8Array(await res.arrayBuffer());
    }

    await runtime.init();
    const canvas = runtime.canvas;
    setCanvasEl(canvas);
    await runtime.load(await loadCartWasm());

    if (withMouse) initMouseEvents(canvas);
    if (withKeyboard) initKeyboardEvents(runtime);

    inpustStore.subscribe(value => {
      runtime.setGamepad(0, value.gamepad);
      runtime.setMouse(value.mouseX, value.mouseY, value.mouseButtons);
    });

    setRuntime(runtime);
    setLoading(false);
  };

  const resetCart = async () => {
    if (!runtime) return;
    const wasmBuffer = runtime.wasmBuffer!;
    runtime.reset(true);
    runtime.pauseState |= constants.PAUSE_REBOOTING;
    await runtime.load(wasmBuffer);
    runtime.pauseState &= ~constants.PAUSE_REBOOTING;
    runtime.start();
  };

  const update = (timeFrameStart: number) => {
    if (!runtime || !inputState || pause) return;
    reqRef.current = requestAnimationFrame(update);

    let calledUpdate = false;
    // Prevent timeFrameStart from getting too far ahead and death spiralling
    if (timeFrameStart - timeNextUpdateRef.current >= 200) {
      timeNextUpdateRef.current = timeFrameStart;
    }

    while (timeFrameStart >= timeNextUpdateRef.current) {
      timeNextUpdateRef.current += 1000 / 60;
      runtime.update();
      calledUpdate = true;
    }

    if (calledUpdate) runtime.composite();
  };

  return {
    pause,
    loading,
    setPause,
    launchCart: () => runtime?.start(),
    resetCart,
    canvas: canvasEl
  };
};

export default useWasmCart;
