const checkCollision = (userX, virusX, virusY) => {

  const virusSize = 40;
  const userSize = 80;


  const virus = {
    top: virusY,
    bottom: virusY + virusSize - 20,
    left: virusX,
    right: virusX + virusSize
  };

  const user = {
    top: 500 - userSize - 10,
    bottom: 500 - 10,
    left: userX - (userSize/2) + 15,
    right: userX + (userSize/2) - 15
  };

  if (virus.bottom > user.top && virus.top < user.bottom && virus.left < user.right && virus.right > user.left) {
    return (virus.left < user.left ? (user.left+virus.right)/2 : (user.right+virus.left)/2);
  } else {
    return null;
  }
}


export default checkCollision;