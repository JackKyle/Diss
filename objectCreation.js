import { mainLoop, FrictionZone, Ball, Magnet } from './physics.js';

let Friction1 = new FrictionZone(500, 350, 500, 200, "black", "purple", 0.05);

let Friction2 = new FrictionZone(1000, 550, 100, 100, "black", "purple", 0.05);

let magnet1 = new Magnet (1000, 700, 20, 1, "black", "white");

let magnet2 = new Magnet (1000, 850, 20, -1, "black", "white");

let Ball1 = new Ball(100, 100, 20, 250, "black", "red");
Ball1.velocity.x_vector = 5;
Ball1.velocity.y_vector = 2.5;

let Ball2 = new Ball(1300, 700, 15, 100, "black", "yellow");
Ball2.velocity.x_vector = -5;
Ball2.velocity.y_vector = -2.5;

let Ball3 = new Ball(100, 700, 30, 50, "black", "pink");
Ball3.velocity.x_vector = 2;
Ball3.velocity.y_vector = -1;

let Ball4 = new Ball(1300, 100, 20, 50, "black", "black");
Ball4.velocity.x_vector =-5;
Ball4.velocity.y_vector = 2.5;

requestAnimationFrame(mainLoop);