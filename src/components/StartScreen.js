import React, {useEffect} from 'react';
import virus from '../assets/virus.png';

const StartScreen = ({setStatus, sound, setSound}) => {

  const handleStartGame = () => {
    setStatus('playing');
  }



  const handleSound = (e) => {
    if (e.target.classList[1] === 'bi-volume-up-fill') {
      setSound(true);
    } else if (e.target.classList[1] === 'bi-volume-mute-fill') {
      setSound(false);
    }
  }

  useEffect(() => {
    const keydownEnter = (e) => {
      if (e.key === 'Enter') {
        handleStartGame();
      }
    }

    document.addEventListener("keydown", keydownEnter);
    return () => {
      document.removeEventListener("keydown", keydownEnter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div id="switch">
          Sound:
          <i onClick={handleSound} className={`bi bi-volume-up-fill ${!sound ? 'clickable' : ''}`} style={{ opacity: sound ? 1 : 0.2}}></i>
          <i onClick={handleSound}  className={`bi bi-volume-mute-fill ${sound ? 'clickable' : ''}`} style={{ opacity: sound ? 0.2 : 1}}></i>
        </div>
      </div>
      <div id="credits">
        <div>&#169; 2022 by Natalie Chen</div>
        <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/free-icons" title="Flaticon">www.flaticon.com</a></div>
      </div>
    </div>
  )
}

export default StartScreen;