import classNames from 'classnames';
import FlipCard from '../../../components/FlipCard';

const PlayerChoose = ({ player, answerPlayer, showAnswer }) => {
  const {
    avatar,
    username,
  } = answerPlayer ?? {};

  return (
    <div className={classNames('question_player', { chose: answerPlayer })}>
      <p>{player.name}</p>

      <FlipCard fliped={showAnswer}>
        <div className="front">
          <p>{player.username}</p>
        </div>
        <div className="back">
          <img src={avatar} alt={username} />
        </div>
      </FlipCard>
    </div>
  );
};

export default PlayerChoose;
