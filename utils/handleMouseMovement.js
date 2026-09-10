module.exports = handleMouseMovement
const {mouse, Point} = require("@nut-tree-fork/nut-js");
async function handleMouseMovement(socket, data) {

  if(data.mouseType == 0){
/**Desfuncional - no estoy hecho para la matematica */
const SENSITIVITY = 0.1

const MIN_INTERVAL = 16;
let lastMove = 0;

  const now = Date.now();
  if (now - lastMove < MIN_INTERVAL) return;
  lastMove = now;

  const dx = data.dx * SENSITIVITY;
  const dy = data.dy * SENSITIVITY;

  const pos = await mouse.getPosition();

  await mouse.setPosition(
    new Point(pos.x + dx, pos.y + dy)
  );
  console.log(`Mouse moved to: (${pos.x + dx}, ${pos.y + dy})`);
}
if(data.mouseType == 1){
  await mouse.leftClick()
}
if(data.mouseType == 2){
  await mouse.rightClick()
}
if(data.mouseType == 3){
  await mouse.scrollUp(5)
}
if(data.mouseType == 4){
  await mouse.scrollDown(5)
}
}