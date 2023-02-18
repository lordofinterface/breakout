import { createRef, FunctionComponent } from 'preact';
import { useEffect} from 'preact/hooks';
import style from './screen.module.css';

type TScreenProps = {
  canvas?: HTMLCanvasElement
};

export const Screen: FunctionComponent<TScreenProps> = ({ canvas }) => {
  const canvasContainerRef = createRef();

  useEffect(() => {
    if (canvasContainerRef.current && canvas) {
      canvasContainerRef.current.innerHTML = '';
      canvasContainerRef.current.appendChild(canvas);
    }
  }, [JSON.stringify(canvas)])

  return <div
    ref={canvasContainerRef}
    className={style.screen}
  />
};

export default Screen;
