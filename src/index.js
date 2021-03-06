import { createStore } from 'redux';
import reducers from './reducers.js';
import snake from './ui/snake.js';
import board from './ui/board.js';
import apple from './ui/apple.js';
import { tick, changeDirection } from './actions.js';

const store = createStore(reducers);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scale = canvas.width / 500;

const render = () => {
  const state = store.getState();
  ctx.clearRect(0, 0, canvas.width, canvas.height );
  snake(ctx, state.get('snake'), scale);
  board(ctx, scale);
  apple(ctx, state.get('apples'), scale);
}

render();

setInterval(() => {
  store.dispatch(tick());
  render();
}, 150);

window.addEventListener('keydown', e => {
  if (e.keyCode === 38) store.dispatch(changeDirection('NORTH'));
  else if (e.keyCode === 40) store.dispatch(changeDirection('SOUTH'));
  else if (e.keyCode === 37) store.dispatch(changeDirection('WEST'));
  else if (e.keyCode === 39) store.dispatch(changeDirection('EAST'));
})


