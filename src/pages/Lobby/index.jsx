import { useMemo } from 'react';
import Room from './components/Room';
import { useRoom } from '../../services/roomContext';
import { EMOTION, QUESTION } from '../../constants';
import QuestionPart from '../../gameScenes/question';
import EmotionScene from '../../gameScenes/emotion';

const components = {
  [QUESTION]: QuestionPart,
  [EMOTION]: EmotionScene,
};

const CreateRoom = () => {
  const { room } = useRoom();

  const Component = useMemo(() => {
    if (!room) return () => {};

    return components[room.currentGameType];
  }, [room]);

  if (!room?.gameStarted) return <Room />;

  // if (room?.gameFinished) return <GameResults />;

  return (
    <Component />
  );
};

export default CreateRoom;
