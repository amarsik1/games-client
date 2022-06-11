import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import { useProvideRoom, roomContext } from './services/roomContext';
import Lobby from './pages/Lobby';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Lobby />} />
    </Routes>
  </BrowserRouter>
);

function App() {
  const room = useProvideRoom();

  return (
    <roomContext.Provider value={room}>
      <AppRouter />
    </roomContext.Provider>
  );
}

export default App;
