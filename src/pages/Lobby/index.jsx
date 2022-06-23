// import React from 'react';
import { useMemo } from 'react';
import Room from '../../components/CreateRoom';
import WaitToAllPlayersReady from '../../components/WaitToAllPlayersReady';
// import RockPaperScissiors from '../../games/RockPaperScissors';
import { gameScreens } from '../../games/gameList';
import { useRoom } from '../../services/roomContext';
// import App from '../../games/SpaceGame/App';

const CreateRoom = () => {
  const { room } = useRoom();

  const isAllPlayersReady = room && room.readyToRoundPlayers.every(Boolean);

  const gameItem = useMemo(() => (
    gameScreens.find((item) => item.id === room?.currentGameNumber)
  ), [room]);

  if (!room?.gameStarted) return <Room />;

  if (!isAllPlayersReady) {
    return (
      <WaitToAllPlayersReady
        players={room.players}
        readyPlayers={room.readyToRoundPlayers}
      />
    );
  }

  return (
    <div>
      {gameItem && (
        <gameItem.Component />
      )}
    </div>
  );
};

export default CreateRoom;
