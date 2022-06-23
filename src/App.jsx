import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import { roomContext, useProvideRoom } from './services/roomContext';
import Lobby from './pages/Lobby';

const AppRouter = () => {
  const room = useProvideRoom();

  return (
    <roomContext.Provider value={room}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lobby />} />
        </Routes>
      </BrowserRouter>
    </roomContext.Provider>

  );
};

const App = () => (
  <AppRouter />
);

export default App;
