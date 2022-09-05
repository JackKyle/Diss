import { initiate, FrictionZone, Ball, Magnet, Block, Canvas, Teleporter} from './physics.js';

let defaultCanvas2 = new Canvas(0, 0, 1000,1000, 0, "black", "orange");

//let Friction1 = new FrictionZone(500, 350, 100, 100, "black", "purple", 0.05);

//let block1 = new Block(600, 300, 300, 300, "Black", "Silver");

let magnet1 = new Magnet (550, 320, 20, 2000, "North", "black", "white");

let Teleporter1 = new Teleporter (-1, -1, 150, 150, -100, -100, "black", "gold", "silver"); 

let Ball1 = new Ball(480, 450, 20, 100, 5, 0, 5, 1, true, "South", 200, false, true, false, "black", "red", false);


//let Ball2 = new Ball(520, 450, 20, 100, -15, 0, 5, 1, true, "South", 200, false, false, false, "black", "red", false);
initiate();