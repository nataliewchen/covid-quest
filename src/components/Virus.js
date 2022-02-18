import React, {useState, useEffect} from 'react';
import virus from '../imgs/virus.png';

const Virus = ({xPos, yPos}) => {
  const virusSize = 40;
  const userSize = 80;

  return (
    <div className="virus">
      <img src={virus} alt="virus" style={{ top: yPos, left: xPos, width: virusSize, height: virusSize }}/>
    </div>
  )
}


export default Virus;