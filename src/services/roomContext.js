import {
  createContext,
  useContext,
  useState,
} from 'react';

export const roomContext = createContext({});

export const useRoom = () => useContext(roomContext);

export const useProvideRoom = () => {
  const [room, setRoom] = useState(null);
  const [countRequests, setCountRequest] = useState(0);

  const setIsLoading = (status) => {
    const newValue = status ? 1 : -1;

    setCountRequest((prev) => Math.max(0, prev + newValue));
  };

  return {
    room,
    isLoading: Boolean(countRequests),
    setIsLoading,
    setRoom,
  };
};
