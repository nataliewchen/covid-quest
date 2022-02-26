import React, {useEffect} from 'react';

const TouchCover = ({setDirection}) => {

  useEffect(() => {
    const touchControl = (e) => {
      console.log('touch');
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

    document.addEventListener("touchstart", touchControl);
    document.addEventListener("touchend", touchControl);
    return () => {
      document.removeEventListener("touchstart", touchControl)
      document.removeEventListener("touchend", touchControl)
    };
  }, []);
  return (
    <div className="touch-cover">

    </div>
  )
}

export default TouchCover;