import {useStore} from "@nanostores/preact";
import {FunctionComponent} from "preact";
import {inpustStore} from "../stores/input-store";
import style from './gamepad.module.css';
import * as constants from '../vm/constants';

const Gamepad: FunctionComponent = () => {
  const { gamepad } = useStore(inpustStore);

  const press = (key: string) => {
    if (key === 'right') inpustStore.setKey('gamepad', gamepad | constants.BUTTON_RIGHT);
    if (key === 'left') inpustStore.setKey('gamepad', gamepad | constants.BUTTON_LEFT);
    if (key === 'up') inpustStore.setKey('gamepad', gamepad | constants.BUTTON_UP);
    if (key === 'down') inpustStore.setKey('gamepad', gamepad | constants.BUTTON_DOWN);
    if (key === 'x') inpustStore.setKey('gamepad', gamepad | constants.BUTTON_X);
    if (key === 'z') inpustStore.setKey('gamepad', gamepad | constants.BUTTON_Z);
  };

  const release = (key: string) => {
    if (key === 'right') inpustStore.setKey('gamepad', gamepad & ~constants.BUTTON_RIGHT);
    if (key === 'left') inpustStore.setKey('gamepad', gamepad & ~constants.BUTTON_LEFT);
    if (key === 'up') inpustStore.setKey('gamepad', gamepad & ~constants.BUTTON_UP);
    if (key === 'down') inpustStore.setKey('gamepad', gamepad & ~constants.BUTTON_DOWN);
    if (key === 'x') inpustStore.setKey('gamepad', gamepad & ~constants.BUTTON_X);
    if (key === 'z') inpustStore.setKey('gamepad', gamepad & ~constants.BUTTON_Z);
  }

  return (
    <section className={style.gamepad}>
      <div
        className={style.left}
        onTouchStart={() => { press('left'); }}
        onTouchEnd={() => { release('left'); }}
      />
      <div
        className={style.right}
        onTouchStart={() => { press('right'); }}
        onTouchEnd={() => { release('right'); }}
      />
    </section>
  );
};

export default Gamepad;
