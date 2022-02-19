import React, {useEffect} from 'react';
import virus from '../assets/virus.png';

const StartScreen = ({setStatus}) => {

  const handleStartGame = () => {
    setStatus('playing');
  }

  const keydownEnter = (e) => {
    if (e.key === 'Enter') {
      handleStartGame();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", keydownEnter);
    return () => {
      document.removeEventListener("keydown", keydownEnter);
    };
  }, []);

  return (
    <div id="start-screen">
      <div id="info">
        <h1>c<img src={virus} alt="virus" />vid quest</h1>
        <div>
          <p>You've just launched your first mission into space...</p>
          <p>But wait a second — How did COVID-19 get out here?!</p>
        </div>
        <p>Dodge the coronavirus asteroids either by using the left & right arrow keys or tapping on the left & right sides of the screen.</p>
        <button onClick={handleStartGame}>START</button>
      </div>
      <div id="credits">
        <div>&#169; 2022 by Natalie Chen</div>
        <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/free-icons" title="Flaticon">www.flaticon.com</a></div>
      </div>
    </div>
  )
}

export default StartScreen;