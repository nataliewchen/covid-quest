import React, {useState, useEffect} from 'react';
import ReactAudioPlayer from 'react-audio-player';

// components
import Virus from './Virus';
import EndScreen from './EndScreen';

// assets
import rocket from '../assets/rocket.png'
import crash from '../assets/crash.png';
import vaccine from '../assets/vaccine.png';
import bgMusic from '../assets/Electronic Fantasy.ogg';
import crashSfx from '../assets/crash.wav';

// utils
import checkCollision from '../checkCollision';

const Game = ({status, setStatus, sound}) => {
  const [direction, setDirection] = useState(0);
  const [distance, setDistance] = useState(0);
  const [collision, setCollision] = useState(null);
  const [positions, setPositions] = useState({
    userX: 150,
    viruses: []
  });
  const [itemSpeed, setItemSpeed] = useState(1);
  const [lives, setLives] = useState(3);
  const [blink, setBlink] = useState(false); 
  const [bgPos, setBgPos] = useState(0);

  // adds a class that lowers the opacity of the rocket
  const blinkUser = () => {
    setBlink(true);
    setTimeout(() => {
      setBlink(false);
    }, 200);
  }

  useEffect(() => {
    const updateObjects = setInterval(() => {
      if (!collision) {
        setPositions(prev => {
          // update virus positions based on speed and check each virus for user collision
          const afterUpdate = prev.viruses.map(virus => ({
            x: virus.x,
            y: virus.y + 3*itemSpeed,
            collision: checkCollision(prev.userX, virus.x, virus.y)
          }));

          // filter out a collided virus (so it disappears from screen)
          const active = afterUpdate.filter(virus => {
            if (virus.collision) {
              blinkUser(); // user feedback
              setLives(prev => { // decrease lives
                if (prev === 1) {
                  setCollision(virus.collision); // game over if no lives left
                }
                return prev - 1;
              })
            }
            // keep any viruses that are still visible on screen and not collided
            return (virus.y < 500 && virus.collision === null);
          });

          // update user position based on controls
          return {
            userX: (prev.userX + direction > 20 && prev.userX + direction < 280 ? prev.userX + direction : prev.userX), 
            viruses: active
          }
        });
        setBgPos(prev => prev + 2);
      } else { // collision
        clearInterval(updateObjects);
      }
    }, 20);

    return function cleanup() {
      clearInterval(updateObjects);
    }

  }, [direction, collision, itemSpeed]);

  useEffect(() => {
    const updateDistance = setInterval(() => {
      if (!collision) {
        setDistance(prev => prev + 1);
      } else {
        setDistance(prev => prev);
        clearInterval(updateDistance);
      }
    }, 500);

    const increaseSpeed = setInterval(() => {
      if (!collision) {
        setItemSpeed(prev => prev + 0.2);
      }
    }, 5000);

    return function cleanup() {
      clearInterval(updateDistance);
      clearInterval(increaseSpeed);
    }
  }, [collision, itemSpeed]);

  useEffect(() => {
    const addVirus = setInterval(() => {
      if (!collision) {
        setPositions(prev => ({
          ...prev,
          viruses: [...prev.viruses, {
            x: Math.floor(Math.random()*260),
            y: -80, 
            collision: false
          }]
        }));
      } else { // collision
        clearInterval(addVirus);
      }
    }, 1000/itemSpeed);

    return function cleanup() {
      clearInterval(addVirus);
    }
  }, [collision, itemSpeed]);

  useEffect(() => {
    if (sound && lives < 3) {
      const crashAudio = document.querySelector('#crash-audio');
      crashAudio.play();
      crashAudio.currentTime = 0; // reset audio for next crash
    }
  }, [sound, lives, collision])




  const touchControl = (e) => {
    const midpoint = window.innerWidth/2;
    if (e.type === "touchend") {
      setDirection(0);
    } else if (e.type === "touchstart" ) {
        const x = e.touches[0].clientX;
        if (x < midpoint) {
          setDirection(-5);
        } else if ( x > midpoint) {
          setDirection(5);
        }
    }
  }
  

  useEffect(() => {
    let keyLog = {};
    const changeDirection = (e) => {
      keyLog[e.key] = e.type;
      const left = keyLog['ArrowLeft'];
      const right = keyLog['ArrowRight'];
      if (left === 'keydown' && right !== 'keydown') { // left arrow only: move left
        setDirection(-5);
      } else if (right === 'keydown' && left !== 'keydown') { // right arrow only: move right
        setDirection(5);
      } else if (left === 'keyup' || right === 'keyup' || (left === 'keydown' && right === 'keydown')) { // both arrows down or up: stop
        setDirection(0);
      }
    }
    document.addEventListener("keydown", changeDirection);
    document.addEventListener("keyup", changeDirection);
    document.addEventListener("touchstart", touchControl);
    document.addEventListener("touchend", touchControl);
    return () => {
      document.removeEventListener("keydown", changeDirection);
      document.removeEventListener("keyup", changeDirection);
      document.removeEventListener("touchstart", touchControl)
      document.removeEventListener("touchend", touchControl)
    };
  }, []);



  
  return (
    <div id="game" style={{ backgroundPosition: `50% ${bgPos}px`}}>
      <iframe src="https://olafwempe.com/mp3/silence/silence.mp3" type="audio/mp3" allow="autoplay" id="audio" style={{display: "none"}} title="silence"></iframe>
      {!collision && sound ? <ReactAudioPlayer id="bg-audio"
        src={bgMusic}
        autoPlay={true}
        controls={false}
        volume={0.4}
      /> : ''}
       {sound ? <ReactAudioPlayer id="crash-audio"
        src={crashSfx}
        autoPlay={false}
        controls={false}
        volume={0.4}
      /> : ''}
      <div id="game-header">
        <div id="lives">LIVES: &nbsp; 
          {lives > 0 ? <img key={1} src={vaccine} alt="vaccine"/> : ""}
          {lives > 1 ? <img key={2} src={vaccine} alt="vaccine"/> : ""}
          {lives > 2 ? <img key={3} src={vaccine} alt="vaccine"/> : ""}
        </div>
        <div id="distance">{Math.trunc(distance)} MILES</div>
      </div>
      
      {positions.viruses.map((virus, i) => 
        <Virus key={i} xPos={virus.x} yPos={virus.y}
      /> )}
      {collision ? <img id="crash" src={crash} alt="virus" style={{ top: 385, left: collision }} /> : ""}
     
      <div id="user" className={`${blink ? "crash-blink" : ""}`}>
        <img src={rocket} alt="rocket" style={{ left: positions.userX }} />
      </div>
      {collision ? <EndScreen distance={distance} setStatus={setStatus} /> : ""}
    </div>
  )
}

export default Game;