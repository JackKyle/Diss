import { initiate, FrictionZone, Ball, Magnet, Block, Canvas, Teleporter} from './physics.js';

let defaultCanvas = new Canvas(0, 0, 1200,1200, 0.01, "black", "orange");

let Friction1 = new FrictionZone(500, 300, 200, 200, "black", "purple", 0.1);

let block1 = new Block(400, 0, 100, 400, "Black", "Silver");
let block2 = new Block(700, 0, 100, 400, "Black", "Silver");
let block3 = new Block(500, 500, 200, 100, "Black", "Silver");

let Teleporter1 = new Teleporter (525, 600, 150, 150, 600, 150, "black", "gold", "silver"); 

let Ball1 = new Ball(110, 450, 20, 10, 0, 0, 5, 0.1, false, "/", 0, false, true, false, "black", "red");
let Ball2 = new Ball(600, 50, 30, 10, 0, 0, 0, 0, true, "North", 40, true, false, false, "black", "turquoise");
let Ball3 = new Ball(600, 250, 30, 10, 0, 0, 0, 0, true, "North", 40, true, false, false, "black", "turquoise");
let Ball4 = new Ball(1000, 450, 20, 10, -5, -3, 5, 1, true, "South", 20, false, false, false, "black", "yellow");
let Ball5 = new Ball(300, 700, 20, 15, 5, 2, 5, 1, true, "South", 20, false, false, false, "black", "yellow");
let Ball6 = new Ball(900, 950, 20, 5, -3, 2, 5, 1, true, "South", 20, false, false, false, "black", "yellow");
let Ball7 = new Ball(1000, 250, 20, 30, 2, -4, 5, 1, true, "South", 20, false, false, false, "black", "yellow");
let Ball8 = new Ball(100, 150, 20, 20, 0, 0, 5, 1, true, "South", 20, false, false, false, "black", "yellow");

let magnet1 = new Magnet(100, 100, 20, 300, "North", "black", "white");

initiate();