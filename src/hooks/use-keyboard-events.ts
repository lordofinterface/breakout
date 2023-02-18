import {Runtime} from "../vm/runtime";
import * as constants from '../vm/constants';
import {useEffect, useState} from "preact/hooks";
import {inpustStore} from '../stores/input-store';
import {useStore} from "@nanostores/preact";

const useKeyboardEvents = () => {
  const [runtime, setRuntime] = useState<Runtime | null>(null);
  const { gamepad } = useStore(inpustStore)

  useEffect(() => {
    const onKeyboardEvent = (event: KeyboardEvent) => {
      if (!runtime) return;
      if (event.ctrlKey || event.altKey) {
        return; // Ignore ctrl/alt modified key presses because they may be the user trying to navigate
      }

      if (event.srcElement instanceof HTMLElement && event.srcElement.tagName == "INPUT") {
        return; // Ignore if we have an input element focused
      }

      const down = (event.type == "keydown");

      // Poke WebAudio
      runtime.unlockAudio();

      // We're using the keyboard now, hide the mouse cursor for extra immersion
      document.body.style.cursor = "none";

      let mask = 0;
      switch (event.code) {
        case "KeyX": case "KeyV": case "Space": case "Period":
          mask = constants.BUTTON_X;
          break;
        case "KeyZ": case "KeyC": case "Comma":
          mask = constants.BUTTON_Z;
          break;
        case "ArrowUp":
          mask = constants.BUTTON_UP;
          break;
        case "ArrowDown":
          mask = constants.BUTTON_DOWN;
          break;
        case "ArrowLeft":
          mask = constants.BUTTON_LEFT;
          break;
        case "ArrowRight":
          mask = constants.BUTTON_RIGHT;
          break;
      }

      if (mask != 0) {
        event.preventDefault();
        // Set or clear the button bit from the next input state
        if (down) {
          inpustStore.setKey('gamepad', gamepad | mask);
        } else {
          inpustStore.setKey('gamepad', gamepad & ~mask);
        }
      }
    };

    if (runtime) {
      window.addEventListener("keydown", onKeyboardEvent);
      window.addEventListener("keyup", onKeyboardEvent);
    }

    return () => {
      window.removeEventListener("keydown", onKeyboardEvent);
      window.removeEventListener("keyup", onKeyboardEvent);
    };
  }, [JSON.stringify(runtime)]);

  return {
    initKeyboardEvents: setRuntime 
  };
};

export default useKeyboardEvents;
