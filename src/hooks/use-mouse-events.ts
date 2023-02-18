import {useEffect, useState} from 'preact/hooks';
import {inpustStore} from '../stores/input-store';
import * as constants from '../vm/constants';

const useMouseEvents = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const onMouseEvent = (event: PointerEvent) => {
      if (!canvas) return;

      document.body.style.cursor = "";

      if (event.isPrimary) {
        const bounds = canvas.getBoundingClientRect();
        const mouseX = Math.fround(constants.WIDTH * (event.clientX - bounds.left) / bounds.width);
        const mouseY = Math.fround(constants.HEIGHT * (event.clientY - bounds.top) / bounds.height);
        const mouseButtons = event.buttons & 0b111;

        inpustStore.setKey('mouseX', mouseX);
        inpustStore.setKey('mouseY', mouseY);
        inpustStore.setKey('mouseButtons', mouseButtons);
      }
    };

    if (canvas) {
      window.addEventListener("pointerdown", onMouseEvent);
      window.addEventListener("pointerup", onMouseEvent);
      window.addEventListener("pointermove", onMouseEvent);
      canvas.addEventListener("contextmenu", e => {e.preventDefault()});
    }

    return () => {
      window.removeEventListener("pointerdown", onMouseEvent);
      window.removeEventListener("pointerup", onMouseEvent);
      window.removeEventListener("pointermove", onMouseEvent);
    }
  }, [canvas]);

  return { initMouseEvents: setCanvas };
}


export default useMouseEvents;
