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
import Anon from './components/Anon/Anon';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/EditProfile/EditProfile';

function App() {
  return (
    <div className="App">
    <Routes>
    <Route path='/' element={<MemoriesPage />} />
      <Route path='/signup' element={
      <Anon>
        <SignupPage />
      </Anon> } />
      <Route path='/login' element={
      <Anon>
        <LoginPage />
      </Anon>} />
      <Route path='/profile/:userid' element={<Profile />} />
      <Route path='/profile/edit/:userid' element={<EditProfile />} />
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
