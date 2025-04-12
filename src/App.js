import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import IntroScreen from './components/ui/IntroScreen';
import GameView from './components/game/GameView/GameView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroScreen />} />
        <Route path="/game" element={<GameView />} />
      </Routes>
    </Router>
  );
}

export default App;
