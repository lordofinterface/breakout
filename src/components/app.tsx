import {useEffect, useState} from 'preact/hooks';
import useWasmCart from '../hooks/use-wasm-cart';
import Preview from './preview';
import Menu from './menu';
import Screen from './screen';
import Gamepad from './gamepad';
import style from './app.module.css';

const App = () => {
  const [isGameLaunched, setIsGameLaunched] = useState(false);
  const {
    canvas,
    pause,
    loading,
    setPause,
    launchCart,
    resetCart
  } = useWasmCart({
    withKeyboard: true,
    withMouse: true,
    cartName: 'cart'
  });

  if (loading || !isGameLaunched) return (
    <Preview
      loading={loading}
      launch={() => { launchCart(); setIsGameLaunched(true) }}
    />
  );

  return (
    <main className={style.main}>
      <button onClick={() => {setPause(!pause)}}>pause</button>
      <Screen canvas={canvas} />
      <Gamepad />
      {pause && (
        <Menu
          isPauseMenu={pause}
          disablePause={() => {setPause(false);}}
          resetCart={resetCart}
        />
      )}
    </main>
  )
};

export default App;
