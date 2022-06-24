import { useEffect } from 'react';
import QRCode from 'react-qr-code';
import { v4 } from 'uuid';
import RequestService from '../../services/RequestApi';
import { useRoom } from '../../services/roomContext';
import socket from '../../socket';
import { getUniquePlayers } from './helpers';

function Room() {
  const { room, setRoom } = useRoom();

  useEffect(() => {
    const handleCreateRoom = async () => {
      const storageUuid = localStorage.getItem('uuid');
      const hostUuid = storageUuid || v4();

      if (!storageUuid) localStorage.setItem('uuid', hostUuid);
      const [response] = await new RequestService('rooms/create').post({ hostUuid });

      setRoom(response);
      socket.emit('joinToRoom', response._id);
    };

    handleCreateRoom();
  }, []);

  useEffect(() => {
    if (!room) return;

    socket.on('playerConnected', (player) => {
      if (typeof player !== 'object') return;

      setRoom((prev) => ({
        ...prev,
        players: getUniquePlayers([...prev.players, player]),
      }));
    });
  }, [room]);

  useEffect(() => {
    const startGame = async () => {
      const [{ id: gameId }] = room.games;

      await new RequestService('rooms/start-game').post({ roomId: room._id });
      await new RequestService('rooms/set-active-game').post({ currentGameNumber: gameId, roomId: room._id });
      setRoom((prev) => ({ ...prev, gameStarted: true, currentGameNumber: gameId }));
    };

    if (room?.players.length >= 2) startGame();
  }, [room]);

  return (
    <div style={{ padding: '5px' }}>
      {room?.players.map(({ uuid, username }) => (
        <p key={uuid}>{username}</p>
      ))}
      {room && (
        <QRCode
          value={JSON.stringify({
            isAmarsikApp: true,
            roomId: room._id,
          })}
        />
      )}
      Room
    </div>
  );
}

export default Room;
