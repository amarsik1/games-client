import classNames from 'classnames';
import { useRoom } from '../../services/roomContext';
import './styles.scss';

const Preloader = () => {
  const { isLoading } = useRoom();

  return (
    <div className={classNames('loader_wrapper', { loading: isLoading })}>
      <div className={classNames('loader', { loading: isLoading, qwe: true })} />
    </div>
  );
};

export default Preloader;
