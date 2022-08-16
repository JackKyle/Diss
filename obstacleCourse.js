import { mainLoop, FrictionZone, Ball, Magnet, Block, Canvas, Teleporter} from './physics.js';

let defaultCanvas = new Canvas(0, 0, 1500,1500, 0.1, "black", "orange");

let Friction1 = new FrictionZone(1300, 0, 100, 300, "black", "purple", 0.5);

let Friction2 = new FrictionZone(900, 1200, 100, 300, "black", "purple", 0.5);

let Friction3 = new FrictionZone(600, 300, 300, 100, "black", "purple", 0.5);

let Friction4 = new FrictionZone(400, 1400, 300, 100, "black", "purple", 0.5);

let Friction5 = new FrictionZone(0, 300, 200, 1200, "black", "purple", 0);

let block1 = new Block(0, 200, 300, 100, "black", "Silver");

let block2 = new Block(300, 200, 300, 100, "black", "Silver");

let block3 = new Block(600, 200, 300, 100, "black", "Silver");

let block4 = new Block(900, 200, 400, 100, "black", "Silver");

let block5 = new Block(1400, 200, 100, 100, "black", "Silver");

let block6 = new Block(1300, 400, 125, 100, "black", "Silver");

let block7 = new Block(1375, 600, 125, 100, "black", "Silver");

let block8 = new Block(1300, 800, 125, 100, "black", "Silver");

let block9 = new Block(1375, 1000, 125, 100, "black", "Silver");

let block10 = new Block(1100, 1200, 325, 100, "black", "Silver");

let block11 = new Block(800, 400, 100, 300, "black", "Silver");

let block12 = new Block(800, 700, 100, 300, "black", "Silver");

let block13 = new Block(800, 1000, 100, 300, "black", "Silver");

let block14 = new Block(800, 1300, 100, 200, "black", "Silver");

let block15 = new Block(400, 1300, 300, 100, "black", "Silver");

let block16 = new Block(600, 400, 100, 100, "black", "Silver");

let block17 = new Block(700, 600, 100, 100, "black", "Silver");

let block18 = new Block(600, 800, 100, 100, "black", "Silver");

let block19 = new Block(700, 1000, 100, 100, "black", "Silver");

let block20 = new Block(600, 1200, 100, 100, "black", "Silver");

let block21 = new Block(400, 300, 100, 300, "black", "Silver");

let block22 = new Block(400, 600, 100, 300, "black", "Silver");

let block23 = new Block(400, 900, 100, 400, "black", "Silver")

let block24 = new Block(200, 500, 100, 300, "black", "Silver");

let block25 = new Block(200, 800, 100, 300, "black", "Silver");

let block26 = new Block(200, 1100, 100, 400, "black", "Silver");

let block27 = new Block(200, 300, 100, 100, "black", "Silver");

let magnet1 = new Magnet (1150, 350, 20, 30, "North", "black", "white");

let magnet2 = new Magnet (1150, 750, 20, 30, "North", "black", "white");

let magnet3 = new Magnet (1150, 1150, 20, 30, "North", "black", "white");

let Teleporter1 = new Teleporter (200, 0, 100, 100, 100, 100, "black", "gold", "silver");

let Teleporter2 = new Teleporter (400, 100, 100, 100, 100, 100, "black", "gold", "silver"); 

let Teleporter3 = new Teleporter (600, 0, 100, 100, 100, 100, "black", "gold", "silver");

let Teleporter4 = new Teleporter (800, 100, 100, 100, 100, 100, "black", "gold", "silver");

let Teleporter5 = new Teleporter (1000, 0, 100, 100, 100, 100, "black", "gold", "silver");

let Teleporter6 = new Teleporter (1200, 100, 100, 100, 100, 100, "black", "gold", "silver");

let Teleporter7 = new Teleporter (1400, 0, 100, 200, 100, 100, "black", "gold", "silver");

let Teleporter8 = new Teleporter (1200, 300, 100, 900, 1350, 250, "black", "gold", "silver");

let Teleporter9 = new Teleporter (1400, 1400, 100, 100, 1350, 250, "black", "gold", "silver");

let Teleporter10 = new Teleporter (1200, 1300, 100, 100, 1350, 250, "black", "gold", "silver");

let Teleporter11 = new Teleporter (1000, 1400, 100, 100, 1350, 250, "black", "gold", "silver");

let Teleporter12 = new Teleporter (1000, 300, 100, 1000, 950, 1350, "black", "gold", "silver");

let Teleporter13 = new Teleporter (500, 300, 100, 1000, 700, 350, "black", "gold", "silver");

let Teleporter14 = new Teleporter (300, 300, 100, 100, 550, 1450, "black", "gold", "silver");

let Teleporter15 = new Teleporter (200, 400, 100, 100, 100, 350, "black", "gold", "silver");

let Ball1 = new Ball(100, 100, 20, 10, 0, 0, 5, 1, true, "South", 4, false, true, false, "black", "red", "false");

let Ball2 = new Ball(930, 1170, 30, 20, 0, 0, 5, 1, false, "/", 0, true, false, false, "black", "red", "false");

let Ball3 = new Ball(970, 1070, 30, 20, 0, 0, 5, 1, false, "/", 0, true, false, false, "black", "red", "false");

let Ball4 = new Ball(930, 970, 30, 20, 0, 0, 5, 1, false, "/", 0, true, false, false, "black", "red", "false");

let Ball5 = new Ball(970, 870, 30, 20, 0, 0, 5, 1, false, "/", 0, true, false, false, "black", "red", "false");

let Ball6 = new Ball(930, 770, 30, 20, 0, 0, 5, 1, false, "/", 0, true, false, false, "black", "red", "false");

let Ball7 = new Ball(970, 670, 30, 20, 0, 0, 5, 1, false, "/", 0, true, false, false, "black", "red", "false");

let Ball8 = new Ball(930, 570, 30, 20, 0, 0, 5, 1, false, "/", 0, true, false, false, "black", "red", "false");

let Ball9 = new Ball(970, 470, 30, 20, 0, 0, 5, 1, false, "/", 0, true, false, false, "black", "red", "false");

let Ball14 = new Ball(670, 650, 30, 20, 0, 0, 5, 1, true, "South", 3, true, false, false, "black", "red", "false");

let Ball15 = new Ball(670, 1050, 30, 20, 0, 0, 5, 1, true, "South", 3, true, false, false, "black", "red", "false");

let Ball16 = new Ball(100, 350, 30, 20, -3, 5, 5, 1, false, "/", 0, false, false, false, "black", "red", "false");

requestAnimationFrame(mainLoop);