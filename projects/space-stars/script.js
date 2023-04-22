const board = document.querySelector(".board");
const size = { min: 5, max: 15 };

let lastTimestamp = 0;
let speed = 10;

function render(timestamp) {
  if (lastTimestamp + speed <= timestamp) {
    lastTimestamp = timestamp;
    randomCircle(board, size);
  }

  window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);


function randomCircle(board, size){
  // random position in board
  const boardBounding = board.getBoundingClientRect();
  const x = Math.trunc(Math.random() * (boardBounding.right  - size.max) + size.min);
  const y = Math.trunc(Math.random() * (boardBounding.bottom - size.max) + size.min);

  // circle
  const circle = document.createElement("div");
  const circleSize = Math.random() * size.max + size.min + 'px';
  const circleColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
  circle.style.backgroundColor = circleColor; 
  circle.style.boxShadow = `0px 0px 2rem ${circleColor}`
  circle.classList.add('circle');
  board.appendChild(circle);

  setTimeout(() => {
    circle.style.top = y + 'px';
    circle.style.left = x + 'px';
    circle.style.width = circleSize;
    circle.style.height = circleSize;
    setTimeout(() => {
      board.removeChild(circle);
    }, 1000);
  }, 100);

}
