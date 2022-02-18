import React, {useEffect} from 'react';

const EndScreen = ({distance, setStatus}) => {
  const handleRestart = () => {
    setStatus('start');
  }

  const keydownEnter = (e) => {
    if (e.key === 'Enter') {
      handleRestart();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", keydownEnter);
    return () => {
      document.removeEventListener("keydown", keydownEnter);
    };
  }, []);

  return (
    <div id="end-screen">
      <h2>GAME OVER</h2>
      <p>You traveled {distance} miles!</p>
      <button onClick={handleRestart}>RESTART</button>
    </div>
  )
}

export default EndScreen;