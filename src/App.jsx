import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { useEffect } from 'react';
import { v4 } from 'uuid';
import './App.css';
import { roomContext, useProvideRoom } from './services/roomContext';
import Lobby from './pages/Lobby';
import Preloader from './components/Preloader';
import HomePage from './pages/HomePage';

const AppRouter = () => {
  const room = useProvideRoom();

  useEffect(() => {
    const storageUuid = localStorage.getItem('uuid');
    const hostUuid = storageUuid || v4();

    if (!storageUuid) localStorage.setItem('uuid', hostUuid);
  }, []);

  return (
    <roomContext.Provider value={room}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room" element={<Lobby />} />
        </Routes>
      </BrowserRouter>

      <Preloader />
    </roomContext.Provider>
  );
};

const App = () => (
  <AppRouter />
);

export default App;
