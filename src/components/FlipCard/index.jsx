import classNames from 'classnames';
import './styles.scss';

const FlipCard = ({ children, fliped }) => (
  <div className={classNames('parent', { fliped })}>
    {children}
  </div>
);

export default FlipCard;
