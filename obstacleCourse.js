import { initiate, FrictionZone, Ball, Magnet, Block, Canvas, Teleporter} from './physics.js';

let defaultCanvas = new Canvas(0, 0, 1200,1500, 0.1, "black", "grey");

let Friction1 = new FrictionZone(900, 200, 100, 100, "black", "purple", 0.5);

let Friction2 = new FrictionZone(700, 1300, 100, 100, "black", "purple", 0.5);

let Friction3 = new FrictionZone(300, 300, 100, 100, "black", "purple", 0.5);

let Friction5 = new FrictionZone(300, 400, 100, 1000, "black", "orange", -0.001);

let Friction6 = new FrictionZone(0, 300, 200, 1200, "black", "pink", 0.001);

let block1 = new Block(0, 200, 300, 100, "black", "Silver");

let block2 = new Block(300, 200, 300, 100, "black", "Silver");

let block3 = new Block(600, 200, 300, 100, "black", "Silver");

let block4 = new Block(1000, 0, 100, 300, "black", "Silver");

let block5 = new Block(400, 400, 300, 100, "black", "Silver");

let block6 = new Block(800, 300, 100, 300, "black", "Silver");

let block7 = new Block(800, 600, 100, 300, "black", "Silver");

let block8 = new Block(800, 900, 100, 300, "black", "Silver");

let block9 = new Block(800, 1200, 100, 200, "black", "Silver");

let block10 = new Block(700, 600, 100, 100, "black", "Silver");

let block11 = new Block(600, 800, 100, 100, "black", "Silver");

let block12 = new Block(700, 1000, 100, 100, "black", "Silver");

let block13 = new Block(600, 1300, 100, 200, "black", "Silver");

let block14 = new Block(400, 500, 100, 300, "black", "Silver");

let block15 = new Block(400, 800, 100, 300, "black", "Silver")

let block16 = new Block(400, 1100, 100, 400, "black", "Silver")

let block17 = new Block(200, 600, 100, 300, "black", "Silver");

let block18 = new Block(200, 900, 100, 400, "black", "Silver");

let block19 = new Block(200, 1400, 100, 100, "black", "Silver");

let block20 = new Block(200, 300, 100, 300, "black", "Silver");

let magnet1 = new Magnet (1150, 350, 20, 1000, "North", "black", "white");

let magnet2 = new Magnet (1150, 750, 20, 1000, "North", "black", "white");

let magnet3 = new Magnet (1150, 1150, 20, 1000, "North", "black", "white");

let Teleporter1 = new Teleporter (200, 0, 100, 100, 100, 100, "black", "gold", "silver");

let Teleporter2 = new Teleporter (400, 100, 100, 100, 100, 100, "black", "gold", "silver"); 

let Teleporter3 = new Teleporter (600, 0, 100, 100, 100, 100, "black", "gold", "silver");

let Teleporter4 = new Teleporter (800, 100, 100, 100, 100, 100, "black", "gold", "silver");

let Teleporter12 = new Teleporter (1000, 300, 100, 1200, 950, 250, "black", "gold", "silver");

let Teleporter13 = new Teleporter (500, 500, 100, 1000, 750, 1350, "black", "gold", "silver");

let Teleporter14 = new Teleporter (300, 1400, 100, 100, 350, 350, "black", "gold", "silver");

let Teleporter15 = new Teleporter (200, 1300, 100, 100, 100, 350, "black", "gold", "silver");

let Ball1 = new Ball(100, 100, 20, 10, 0, 0, 5, 1, true, "South", 40, false, true, false, "black", "red");

let Ball2 = new Ball(930, 1170, 30, 20, 0, 0, 5, 1, false, "/", 0, true, false, false, "black", "turquoise");

let Ball3 = new Ball(970, 1070, 30, 20, 0, 0, 5, 1, false, "/", 0, true, false, false, "black", "turquoise");

let Ball4 = new Ball(930, 970, 30, 20, 0, 0, 5, 1, false, "/", 0, true, false, false, "black", "turquoise");

let Ball5 = new Ball(970, 870, 30, 20, 0, 0, 5, 1, false, "/", 0, true, false, false, "black", "turquoise");

let Ball6 = new Ball(930, 770, 30, 20, 0, 0, 5, 1, false, "/", 0, true, false, false, "black", "turquoise");

let Ball7 = new Ball(970, 670, 30, 20, 0, 0, 5, 1, false, "/", 0, true, false, false, "black", "turquoise");

let Ball8 = new Ball(930, 570, 30, 20, 0, 0, 5, 1, false, "/", 0, true, false, false, "black", "turquoise");

let Ball9 = new Ball(970, 470, 30, 20, 0, 0, 5, 1, false, "/", 0, true, false, false, "black", "turquoise");

let Ball10 = new Ball(670, 650, 30, 20, 0, 0, 5, 1, true, "South", 40, true, false, false, "black", "turquoise");

let Ball11 = new Ball(670, 1050, 30, 20, 0, 0, 5, 1, true, "South", 40, true, false, false, "black", "turquoise");

let Ball12 = new Ball(100, 350, 30, 10, -3, 5, 5, 1, false, "/", 0, false, false, false, "black", "red");

initiate();