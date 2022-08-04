import { mainLoop, frictionZone, Ball } from './physics.js';

let Friction1 = new frictionZone(500, 350, 500, 200, "black", "purple", 1);

let Friction2 = new frictionZone(1000, 550, 100, 100, "black", "purple", 1);

let Ball1 = new Ball(100, 100, 20, 250, "black", "red");
Ball1.velocity.x_vector = 10;
Ball1.velocity.y_vector = 5;

let Ball2 = new Ball(1300, 700, 15, 100, "black", "yellow");
Ball2.velocity.x_vector = -10;
Ball2.velocity.y_vector = -5;

let Ball3 = new Ball(100, 700, 30, 1, "black", "pink");
Ball3.velocity.x_vector = 2;
Ball3.velocity.y_vector = -1;

let Ball4 = new Ball(1300, 100, 20, 1, "black", "black");
Ball4.velocity.x_vector =-10;
Ball4.velocity.y_vector = 5;

requestAnimationFrame(mainLoop);