import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestService from '../../services/RequestApi';
import { useRoom } from '../../services/roomContext';

const HomePage = () => {
  const { setIsLoading } = useRoom();
  const [existedKey, setExistedKey] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleCheckIsExist = async () => {
      try {
        setIsLoading(true);

        const storageUuid = localStorage.getItem('uuid');
        const [response] = await new RequestService('rooms/check-is-lobby-exist').post({
          hostKey: storageUuid,
        });

        setExistedKey(response.roomKey);
      } finally {
        setIsLoading(false);
      }
    };

    handleCheckIsExist();
  }, []);

  const handleReconnectToExistRoom = () => {
    // alert('comming soon');
  };

  const handleCreateRoom = () => {
    navigate('/room');
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCreateRoom}
      >
        Створити кімнату
      </button>
      {existedKey && (
      <button
        type="button"
        onClick={handleReconnectToExistRoom}
      >
        Під&apos;єднатись
      </button>
      )}
    </>
  );
};

export default HomePage;
