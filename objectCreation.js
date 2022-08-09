import { mainLoop, FrictionZone, Ball, Magnet } from './physics.js';

let Friction1 = new FrictionZone(500, 350, 500, 200, "black", "purple", 0.05);

let Friction2 = new FrictionZone(1000, 550, 100, 100, "black", "purple", 0.05);

let magnet1 = new Magnet (550, 20, 20, 4, "North", "black", "white");

let magnet2 = new Magnet (950, 880, 20, 4, "South", "black", "white");

let Ball1 = new Ball(110, 450, 20, 100, 5, 0, true, "South", 2, true, "black", "red");

let Ball2 = new Ball(1300, 450, 20, 100, -5, 0, true, "North", 3, false, "black", "yellow");

let Ball3 = new Ball(100, 700, 30, 50, 2, -1, true, "North", 3, false, "black", "pink");

let Ball4 = new Ball(1300, 100, 20, 50, -5, 2.5, false, "/", 0, false, "black", "black");

requestAnimationFrame(mainLoop);