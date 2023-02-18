import { FunctionComponent } from 'preact';
import style from './menu.module.css';

type TMenuProps = {
  isPauseMenu: boolean;
  disablePause: () => void;
  resetCart: () => Promise<void>;
};

const Menu: FunctionComponent<TMenuProps> = ({
  isPauseMenu,
  disablePause,
  resetCart
}) => {

  const restart = async () => {
    await resetCart();
    disablePause();
  }
  return (
    <section className={style.menu}>
      <ul className={style.list}>
        {isPauseMenu && (
          <li><button onClick={disablePause}>continue</button></li>
        )}
        <li><button onClick={restart}>restart</button></li>
      </ul>
    </section>
  );
};

export default Menu;
