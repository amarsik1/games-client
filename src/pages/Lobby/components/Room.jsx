import { useEffect } from 'react';
import QRCode from 'react-qr-code';
import RequestService from '../../../services/RequestApi';
import { useRoom } from '../../../services/roomContext';
import socket from '../../../socket';
import { getUniqueItems } from '../../../helpers';
import PlayerItem from './PlayerItem';

function Room() {
  const { room, setRoom, setIsLoading } = useRoom();

  const handleCreateRoom = async () => {
    try {
      setIsLoading(true);
      const storageUuid = localStorage.getItem('uuid');

      const [response] = await new RequestService('rooms/create').post({
        hostKey: storageUuid,
      });
      setRoom(response);
      socket.emit('joinToRoom', response._id);
    } finally {
      setIsLoading(false);
    }
  };

  const startGame = async () => {
    const [updatedRoom] = await new RequestService('rooms/start-game').post({ roomId: room._id });
    setRoom(updatedRoom);
  };

  useEffect(() => {
    if (room?.players.length >= 6) startGame();
  }, [room]);

  useEffect(() => {
    handleCreateRoom();
  }, []);

  useEffect(() => {
    if (!room) return;

    socket.on('playerConnected', (player) => {
      if (typeof player !== 'object') return;

      setRoom((prev) => ({
        ...prev,
        players: getUniqueItems([...prev.players, player], 'uuid'),
      }));
    });
  }, [room]);

  return (
    <div style={{ padding: '5px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {room?.players.map((player) => (
          <PlayerItem key={player.uuid} player={player} />
        ))}
      </div>
      {room && (
        <QRCode
          value={JSON.stringify({
            isAmarsikApp: true,
            roomId: room._id,
          })}
        />
      )}
      {Boolean(room?.players?.length) && (
        <button onClick={startGame} type="button">
          Почати гру
        </button>
      )}
    </div>
  );
}

export default Room;
