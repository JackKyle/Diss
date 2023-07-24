import { initiate, FrictionZone, Ball, Magnet, Block, Canvas, Teleporter} from './physics.js';

let defaultCanvas2 = new Canvas(0, 0, 1500,900, 0, "black", "black");

let magnet1 = new Magnet (750, 75, 40, 1500, "North", "black", "red");

let magnet2 = new Magnet (750, 825, 40, 1700, "North", "black", "blue");

let magnet3 = new Magnet (375, 450, 40, 1900, "North", "black", "green");

let magnet4 = new Magnet (1125, 450, 40, 1700, "North", "black", "pink");

let magnet5 = new Magnet (750, 450, 60, 2500, "North", "black", "yellow");

let Ball1 = new Ball(100, 100, 20, 300, 5, 3, 5, 1, true, "South", 300, false, false, false, "black", "grey");

let Ball2 = new Ball(750, 450, 40, 300, 0, 0, 0, 0, false, "North", 300, true, false, false, "orange", "orange");

let Ball3 = new Ball(750, 75, 30, 300, 0, 0, 0, 0, false, "North", 300, true, false, false, "red", "red");

let Ball4 = new Ball(750, 825, 30, 300, 0, 0, 0, 0, false, "North", 300, true, false, false, "blue", "blue");

let Ball5 = new Ball(375, 450, 30, 300, 0, 0, 0, 0, false, "North", 300, true, false, false, "green", "green");

let Ball6 = new Ball(1125, 450, 30, 300, 0, 0, 0, 0, false, "North", 300, true, false, false, "pink", "pink");

let Ball7 = new Ball(750, 450, 0, 0.0001, 0, 0, 5, 0.1, false, "North", 300, false, true, true, "black", "black");

initiate();