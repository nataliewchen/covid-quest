import React, {useState} from 'react';
import './App.css';
import { useHeight, useWidth } from './hooks';

import StartScreen from './components/StartScreen';
import Game from './components/Game';

import ReactAudioPlayer from 'react-audio-player';
import bgMusic from './assets/Electronic Fantasy.ogg';


function App() {
  const [status, setStatus] = useState('start');
  const [sound, setSound] = useState(true);
  const height = useHeight();
  const width = useWidth();
  const top = (height-510)/2;
  let scale = 1;
  if (width > 320 && height > 600) {
    scale = Math.min(width/320, height/600);
  }


  return (
    <div className="App" style={{top: top, transform: `scale(${scale})`}}>
       <ReactAudioPlayer id="bg-audio"
        src={bgMusic}
        volume={0.4}
      />
      {status === 'start' ? <StartScreen setStatus={setStatus} sound={sound} setSound={setSound} /> : ""}
      {status === 'playing' ? <Game status={status} setStatus={setStatus} sound={sound} /> : ""}
    </div>
  );
}

export default App;
