import {FunctionComponent} from 'preact';
import style from './preview.module.css';

type TLoaderProps = {
  loading: boolean;
  launch: () => void;
};

const Preview: FunctionComponent<TLoaderProps> = ({ loading, launch }) => {
  return (
    <section className={style.preview}>
      {loading && 'loading'}
      {!loading && (
        <button onClick={launch}>launch</button>
      )}
    </section>
  );
};

export default Preview;
