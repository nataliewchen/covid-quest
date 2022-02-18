import React, {useState} from 'react';
import './App.css';

import StartScreen from './components/StartScreen';
import Game from './components/Game';
import TouchControls from './components/TouchControls';
import EndScreen from './components/EndScreen';

function App() {
  const [status, setStatus] = useState('start');
  const [mobile, setMobile] = useState(false);


  return (
    <div className="App">
      {status === 'start' ? <StartScreen setStatus={setStatus} /> : ""}
      {status === 'playing' ? <Game status={status} setStatus={setStatus} /> : ""}
      {status === 'playing' && mobile ? <TouchControls /> : ""}
    </div>
  );
}

export default App;
