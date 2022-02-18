import React, {useState} from 'react';
import './App.css';

import StartScreen from './components/StartScreen';
import Game from './components/Game';


function App() {
  const [status, setStatus] = useState('start');

  return (
    <div className="App">
      {status === 'start' ? <StartScreen setStatus={setStatus} /> : ""}
      {status === 'playing' ? <Game status={status} setStatus={setStatus} /> : ""}
    </div>
  );
}

export default App;
