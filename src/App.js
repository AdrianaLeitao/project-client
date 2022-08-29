import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MemoriesPage from './pages/MemoriesPage/MemoriesPage';
import GamePage from './pages/GamePage/GamePage.jsx';
import GameDetails from './pages/GameDetails/GameDetails';
import EditGame from './pages/EditGame/EditGame';
import DancePage from './pages/DancePage/DancePage';
import DanceDetails from './pages/DanceDetails/DanceDetails';
import EditDance from './pages/EditDance/EditDance';

function App() {
  return (
    <div className="App">
    <Routes>
    <Route path='/memories' element={<MemoriesPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/games' element={<GamePage />} />
      <Route path='/games/:gameId' element={<GameDetails />} />
      <Route path='/games/edit/:gameId' element={<EditGame />} />
      <Route path='/dance' element={<DancePage />} />
      <Route path='/dance/:danceId' element={<DanceDetails />} />
      <Route path='/dance/edit/:danceId' element={<EditDance />} />
    </Routes>
    </div>
  );
}

export default App;
