import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { v4 } from 'uuid';
import RequestService from '../../services/RequestApi';
import { useRoom } from '../../services/roomContext';
import socket from '../../socket';

function Room() {
  const [players, setPlayers] = useState([]);
  const { room, setRoom } = useRoom();

  useEffect(() => {
    const handleCreateRoom = async () => {
      try {
        const storageUuid = localStorage.getItem('uuid');
        const hostUuid = storageUuid || v4();

        if (!storageUuid) localStorage.setItem('uuid', hostUuid);
        const [response] = await new RequestService('rooms/create').post({ hostUuid });

        setRoom(response);
        socket.emit('joinToRoom', response._id);
      } finally {
        console.log('ok');
      }
    };

    handleCreateRoom();
  }, []);

  useEffect(() => {
    if (!room) return;

    socket.on('playerConnected', (player) => {
      setPlayers((prev) => [...prev, player]);
    });
  }, [room]);

  useEffect(() => {
    const startGame = async () => {
      await new RequestService('rooms/start-game').post({ roomId: room._id });
      await new RequestService('rooms/set-active-game').post({ currentGameNumber: 1, roomId: room._id });
    };

    if (players.length === 1) startGame();
  }, [players, room]);

  return (
    <div style={{ padding: '5px' }}>
      {players.map(({ uuid, username }) => (
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
