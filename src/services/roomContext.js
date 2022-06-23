import {
  createContext,
  useContext,
  useState,
} from 'react';

export const roomContext = createContext({});

export const useRoom = () => useContext(roomContext);

export const useProvideRoom = () => {
  const [room, setRoom] = useState(null);

  return {
    room,
    setRoom,
  };
};
