// import React from 'react';
import { useEffect } from 'react';
import Room from '../../components/CreateRoom';
import RockPaperScissiors from '../../games/RockPaperScissors';
import { useRoom } from '../../services/roomContext';
// import App from '../../games/SpaceGame/App';

const CreateRoom = () => {
  const { room, setRoom } = useRoom();

  if (!room?.gameStarted) return <Room />;

  return (
    <div>
      {/* <App /> */}

      {/* <RockPaperScissiors /> */}
    </div>
  );
};

export default CreateRoom;
