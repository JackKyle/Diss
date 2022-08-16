import { mainLoop, FrictionZone, Ball, Magnet, Block, Canvas, Teleporter} from './physics.js';

let defaultCanvas = new Canvas(0, 0, 1500,3000, 0.01, "black", "orange");

let Friction1 = new FrictionZone(500, 350, 100, 100, "black", "purple", 0.05);

let Friction2 = new FrictionZone(1000, 550, 100, 100, "black", "purple", 0.05);

let block1 = new Block(600, 300, 300, 300, "Black", "Silver");

let magnet1 = new Magnet (550, 20, 20, 2, "North", "black", "white");

let magnet2 = new Magnet (950, 880, 20, 2, "South", "black", "white");

let Teleporter1 = new Teleporter (500, 600, 150, 150, 100, 100, "black", "gold", "silver"); 

let Ball1 = new Ball(110, 450, 20, 100, 5, 0, 0, true, "South", 2, true, false, false, "black", "red");

let Ball2 = new Ball(500, 450, 20, 100, -5, 0, 1, true, "South", 3, false, false, false, "black", "yellow");

let Ball3 = new Ball(100, 700, 30, 50, 2, -1, 0.1, true, "North", 3, false, true, false, "black", "pink");

let Ball4 = new Ball(780, 100, 20, 50, 0, -4, 1, false, "/", 0, false, false, false, "black", "black");

let Ball5 = new Ball(900, 100, 20, 50, -2, 4, 1, false, "/", 0, false, false, false, "black", "black");

let Ball6 = new Ball(840,160, 20, 50, -2, 2, 1, false, "/", 0, false, false, false, "black", "red");

let Ball7 = new Ball(660,740, 20, 50, 2, -2, 1, false, "/", 0, false, false, false, "black", "red");

let Ball8 = new Ball(660,160, 20, 50, 2, 2, 1, false, "/", 0, false, false, false, "black", "red");

let Ball9 = new Ball(1000,740, 20, 50, 7, 0, 0.1, false, "/", 0, false, false, false, "black", "red");

let Ball10 = new Ball(550,840, 20, 50, 2, -2, 1, false, "/", 0, false, false, false, "black", "black"); 

requestAnimationFrame(mainLoop);