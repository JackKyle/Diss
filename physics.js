import { ctx, width, height } from './engineConfig.js';
const BallArray = [];
const PlayerBallArray = [];
const FrictionSquareArray = [];
const MagnetArray = [];
const BlockArray = [];
const CanvasArray = [];
const TeleportArray = [];
let friction = 0.000001;
let moveLeft = false;
let moveRight = false;
let moveDown = false;
let moveUp = false;
class Vector{
    constructor(x_vector, y_vector){
        this.x_vector = x_vector;
        this.y_vector = y_vector;
    }   
    magnitude(){
        return Math.sqrt(this.x_vector**2 + this.y_vector**2);
    } 
    unit(){
        if (this.magnitude() === 0){
            return new Vector (0,0);
        } else {
            return new Vector (this.x_vector/this.magnitude(), this.y_vector/this.magnitude());
        }
    }
    dotproduct(vector_2){
        return ((this.x_vector*vector_2.x_vector)+(this.y_vector*vector_2.y_vector));
    }
}
class Ball{
    constructor(xpoint, ypoint, radius, mass, velocityx, velocityy, accelerationScalar, magnetic, pole, magnetism,
        stationary, player, ghost, outline, fill){
        this.centre = new Vector(xpoint, ypoint);
        this.radius = radius;
        this.mass = mass;
        this.magnetic = magnetic;
        if (this.magnetic == true){
            this.pole = pole;    
            this.magnetism = magnetism;
        } else {
            this.pole = "N/A";
            this.magnetism = 0;
        }
        this.velocity = new Vector(velocityx,velocityy);
        this.accelerationScalar = accelerationScalar;
        this.accelerationVector = new Vector(0,0);
        this.stationary = stationary;
        this.player = player;
        this.outline = outline;
        this.fill = fill;
        if (this.player == true){
            this.canvasCentre = new Vector (width/2,height/2);
            PlayerBallArray.push(this);
        } else{
            this.canvasCentre = new Vector (0,0);
        }
        this.ghost = ghost;
        BallArray.push(this);
    }

    drawBall(){
        ctx.beginPath();
        ctx.arc(this.canvasCentre.x_vector, this.canvasCentre.y_vector, this.radius, 0, 2*Math.PI);
        ctx.strokeStyle = this.outline;
        ctx.stroke();
        ctx.fillStyle = this.fill;
        ctx.fill();
        ctx.closePath();
    }

    //displaying the current acceleration and the velocity of the ball
    speedDisplay(){
        ctx.beginPath();
        ctx.moveTo(this.canvasCentre.x_vector, this.canvasCentre.y_vector);
        ctx.lineTo(this.canvasCentre.x_vector + this.accelerationVector.x_vector*100, this.canvasCentre.y_vector + this.accelerationVector.y_vector*100);
        ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(this.canvasCentre.x_vector, this.canvasCentre.y_vector);
        ctx.lineTo(this.canvasCentre.x_vector + this.velocity.x_vector*10, this.canvasCentre.y_vector + this.velocity.y_vector*10);
        ctx.strokeStyle = "blue";
        ctx.stroke();
        ctx.closePath();
    }
}

class FrictionZone{
    constructor(upperxpoint, upperypoint, xlength, ylength, outline, fill, friction){
        this.upperpoint = new Vector (upperxpoint, upperypoint);
        this.canvasStart = new Vector (0,0);
        this.length = new Vector (xlength, ylength);
        this.outline = outline;
        this.fill = fill;
        this.friction = friction;
        FrictionSquareArray.push(this);
    }

    drawSquare(){
        ctx.beginPath();
        ctx.rect(this.canvasStart.x_vector, this.canvasStart.y_vector, this.length.x_vector, this.length.y_vector);
        ctx.strokeStyle = this.outline;
        ctx.stroke();
        ctx.fillStyle = this.fill;
        ctx.fill();
        ctx.closePath();
    }
}

class Magnet{
    constructor(xpoint, ypoint, radius, magnetism, pole, outline, fill){
        this.centre = new Vector (xpoint, ypoint);
        this.canvasCentre = new Vector(0,0);
        this.radius = radius;
        this.magnetism = magnetism;
        this.pole = pole;
        this.outline = outline;
        this.fill = fill;
        MagnetArray.push(this);
    }
    drawMagnet(){
        ctx.beginPath();
        ctx.arc(this.canvasCentre.x_vector, this.canvasCentre.y_vector, this.radius, 0, 2*Math.PI);
        ctx.strokeStyle = this.outline;
        ctx.stroke();
        ctx.fillStyle = this.fill;
        ctx.fill();
        ctx.closePath();
    }
}

class Block {
    constructor(xstart, ystart, xlength, ylength, outline, fill){
        this.start = new Vector (xstart, ystart);
        this.canvasStart = new Vector (0,0);
        this.length = new Vector (xlength, ylength);
        this.outline = outline;
        this.fill = fill;
        BlockArray.push(this);
    }
    drawBlock(){
        ctx.beginPath();
        ctx.rect(this.canvasStart.x_vector, this.canvasStart.y_vector, this.length.x_vector, this.length.y_vector);
        ctx.strokestyle = this.outline;
        ctx.stroke();
        ctx.fillStyle = this.fill;
        ctx.fill();
        ctx.closePath();
    }

}

class Canvas {
    constructor(xlength, ylength, outline, fill){
        this.universalStart = new Vector(0, 0);
        this.canvasStart = new Vector(0,0);
        this.length = new Vector(xlength, ylength);
        this.outline = outline;
        this.fill = fill;
        CanvasArray.push(this);
    }
    drawCanvas(){
        ctx.beginPath();
        ctx.rect(this.canvasStart.x_vector, this.canvasStart.y_vector, this.length.x_vector, this.length.y_vector);
        ctx.strokestyle = this.outline;
        ctx.stroke();
        ctx.fillStyle = this.fill;
        ctx.fill();
        ctx.closePath();
    }
}

class Teleporter {
    constructor(xstart, ystart, xlength, ylength, xteleport, yteleport, outline, fill, circle){
        this.start = new Vector (xstart, ystart);
        this.canvasStart = new Vector (0,0);
        this.length = new Vector(xlength, ylength);
        this.teleportPoint = new Vector (xteleport, yteleport);
        this.canvasTeleportPoint = new Vector(0,0);
        this.outline = outline;
        this.fill = fill;
        this.circle = circle;
        this.circleCentre = new Vector (this.start.x_vector+(xlength/2),this.start.y_vector+(ylength/2));
        this.canvasCentre = new Vector (0,0);
        if (xlength>ylength){
            this.radius = ylength/5;
        } else {
            this.radius = xlength/5;
        }
        TeleportArray.push(this);
    }
    drawTeleporter(){
        ctx.beginPath();
        ctx.rect(this.canvasStart.x_vector, this.canvasStart.y_vector, this.length.x_vector, this.length.y_vector);
        ctx.strokestyle = this.outline;
        ctx.stroke();
        ctx.fillStyle = this.fill;
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.canvasCentre.x_vector, this.canvasCentre.y_vector, this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.circle;
        ctx.fill();
        ctx.closePath();
    }
}

function checkCollision (ball_1, ball_2){
    //distance between two centres in x and y directions
    let distance_x = ball_1.centre.x_vector-ball_2.centre.x_vector;
    let distance_y = ball_1.centre.y_vector-ball_2.centre.y_vector;
    //magnitude of distance to give a scalar number distance between two centres
    let distance_magnitude = Math.sqrt(distance_x**2+distance_y**2);
    if (ball_1.radius+ball_2.radius>distance_magnitude){
        //overlap between balls (if 0 then no overlap)
        let diff = ball_1.radius+ball_2.radius - distance_magnitude;
        //calculating amount of distance each ball must be moved to make them no longer overlap but still touch
        //calculated by taking the total distance in each plane and dividing it by the total distance magnitude and multiplying 
        //it by the overlap divided by two so that it takes the fact they are each moving half the distance into account
        //each is then added to ball 1 and subtracted from ball 2 in order to ensure each ball moves an equal amount 
        //from the other, producing no overlap in the end
        let move_x = (distance_x/distance_magnitude)*(diff/2);
        let move_y = (distance_y/distance_magnitude)*(diff/2);
        if (ball_1.stationary == false && ball_2.stationary == false){
            ball_1.centre.x_vector += move_x;
            ball_1.centre.y_vector += move_y;   
            ball_2.centre.x_vector -= move_x;
            ball_2.centre.y_vector -= move_y;   
        } else if (ball_1.stationary == true && ball_2.stationary == false) {
            ball_2.centre.x_vector -= 2*move_x;
            ball_2.centre.y_vector -= 2*move_y;
        } else {
            ball_1.centre.x_vector += 2*move_x;
            ball_1.centre.y_vector += 2*move_y; 
        }
    }
}

function ballVectors(ball_1, ball_2){
    //distance between two centres in x and y directions
    let distance_x = ball_1.centre.x_vector-ball_2.centre.x_vector;
    let distance_y = ball_1.centre.y_vector-ball_2.centre.y_vector;
    //magnitude of distance to give a scalar number distance between two centres
    let distance_magnitude = Math.sqrt(distance_x**2+distance_y**2);
    if (ball_1.radius+ball_2.radius>=distance_magnitude){
        //normal vector of collision found from taking centre of circle 1 from centre of circle 2
        let normalVector = new Vector(ball_2.centre.x_vector - ball_1.centre.x_vector, 
        ball_2.centre.y_vector - ball_1.centre.y_vector);
        //unit vector of normal found from dividing both components of vector by magnitude
        let unitNormalVector = new Vector(normalVector.x_vector/normalVector.magnitude(), 
        normalVector.y_vector/normalVector.magnitude());
        //get unit tangent vector of collision 
        let unitTangentVector = new Vector(unitNormalVector.y_vector*-1, unitNormalVector.x_vector);
        //get initial ball 1 normal direction vector by taking dot product of ball's velocity and that of the unit normal vector
        let initialBall1Normal = ball_1.velocity.dotproduct(unitNormalVector);
        //get initial ball 1 tangent direction vector by taking dot product of ball's velocity and that of unit tangent vector
        let ball1Tangent = ball_1.velocity.dotproduct(unitTangentVector);
        let initialBall2Normal = ball_2.velocity.dotproduct(unitNormalVector);
        let ball2Tangent = ball_2.velocity.dotproduct(unitTangentVector);
        //final ball 1 normal velocity taken from formula 
        let finalBall1Normal = ((initialBall1Normal*(ball_1.mass-ball_2.mass))+(2*ball_2.mass*initialBall2Normal))/
        (ball_1.mass+ball_2.mass);
        let finalBall2Normal = ((initialBall2Normal*(ball_2.mass-ball_1.mass))+(2*ball_1.mass*initialBall1Normal))/
        (ball_1.mass+ball_2.mass);
        //calculate new ball normal velocity vectors by multiplying each vector of unit normal vector by 
        //the final ball normal velocity
        let newBall1NormalVectorVelocity = new Vector (unitNormalVector.x_vector*finalBall1Normal, 
        unitNormalVector.y_vector*finalBall1Normal);
        let newBall2NormalVectorVelocity= new Vector (unitNormalVector.x_vector*finalBall2Normal, 
        unitNormalVector.y_vector*finalBall2Normal);
        //calculate new ball tangent velocity vectors by multiplying each vector of unit tangent vector by 
        //the final ball tangent velocity
        let newBall1TangentVectorVelocity = new Vector (unitTangentVector.x_vector*ball1Tangent, 
        unitTangentVector.y_vector*ball1Tangent);
        let newBall2TangentVectorVelocity = new Vector (unitTangentVector.x_vector*ball2Tangent, 
        unitTangentVector.y_vector*ball2Tangent);
        //calculate each ball's velocities by adding that of the normal vector and tangent vector velocity
        if (ball_1.stationary == false){
            ball_1.velocity.x_vector = newBall1NormalVectorVelocity.x_vector+newBall1TangentVectorVelocity.x_vector;
            ball_1.velocity.y_vector = newBall1NormalVectorVelocity.y_vector+newBall1TangentVectorVelocity.y_vector;
        }
        if (ball_2.stationary == false){
            ball_2.velocity.x_vector = newBall2NormalVectorVelocity.x_vector+newBall2TangentVectorVelocity.x_vector;
            ball_2.velocity.y_vector = newBall2NormalVectorVelocity.y_vector+newBall2TangentVectorVelocity.y_vector;
        }
    };
}

//function to add acceleration to the velocity
function addAcceleration(ball_1){
    if (ball_1.accelerationVector.x_vector>0.01 || ball_1.accelerationVector.x_vector<-0.01){
        ball_1.velocity.x_vector += ball_1.accelerationVector.x_vector;    
    }
    if (ball_1.accelerationVector.y_vector>0.01 || ball_1.accelerationVector.y_vector<-0.01){
        ball_1.velocity.y_vector += ball_1.accelerationVector.y_vector;
    }
}

//function to add velocity to the placement of the ball
function addVelocity(ball_1){
    if ((ball_1.velocity.x_vector>0.01 || ball_1.velocity.x_vector<-0.01)&&ball_1.stationary == false){
        ball_1.centre.x_vector += ball_1.velocity.x_vector;
    }
    if ((ball_1.velocity.y_vector>0.01 || ball_1.velocity.y_vector<-0.01)&&ball_1.stationary == false){
        ball_1.centre.y_vector += ball_1.velocity.y_vector;
    }
}

//function to check for friction zones
function checkFriction(ball_1, square_1){
    //checks that the centre of the ball (the point that would be touching the surface of the friction zone if ball
    //is considered a 2d representation of a sphere) is within the coordinates of the zone and applies friction of
    //zone to the ball
    if ((ball_1.centre.x_vector>=square_1.upperpoint.x_vector&&ball_1.centre.x_vector<=
        (square_1.upperpoint.x_vector+square_1.length.x_vector)) && 
        (ball_1.centre.y_vector>=square_1.upperpoint.y_vector&&ball_1.centre.y_vector<=
        (square_1.upperpoint.y_vector+square_1.length.y_vector))){
            ball_1.velocity.x_vector *= 1 - square_1.friction;
            ball_1.velocity.y_vector *= 1 - square_1.friction;
    } else {
        ball_1.velocity.x_vector *= 1 - friction;
        ball_1.velocity.y_vector *= 1 - friction;
    }
}

//function to check if the ball is against the edges 
function checkEdges(ball_1){
    //checks that ball isn't past border of screen and reverses vector dependent on side it hits
    //also brings ball back to edge if it were to cross the border due to the small jumps the ball
    //actually makes to simulate movement
    if (ball_1.centre.x_vector <= ball_1.radius || ball_1.centre.x_vector >= (CanvasArray[0].length.x_vector-ball_1.radius)){
        if (ball_1.centre.x_vector<=ball_1.radius){
            ball_1.centre.x_vector = ball_1.radius;
        } else if (ball_1.centre.x_vector >= (CanvasArray[0].length.x_vector-ball_1.radius)){
            ball_1.centre.x_vector = CanvasArray[0].length.x_vector - ball_1.radius;
        }
        ball_1.velocity.x_vector = -1 * ball_1.velocity.x_vector;
    }

    if (ball_1.centre.y_vector <= ball_1.radius || ball_1.centre.y_vector >= (CanvasArray[0].length.y_vector-ball_1.radius)){
        if (ball_1.centre.y_vector<=ball_1.radius){
            ball_1.centre.y_vector = ball_1.radius;
        } else if (ball_1.centre.y_vector >= (CanvasArray[0].length.y_vector-ball_1.radius)){
            ball_1.centre.y_vector = CanvasArray[0].length.y_vector - ball_1.radius;
        }
        ball_1.velocity.y_vector = ball_1.velocity.y_vector * -1;
    }
}

//function for checking magnetism in objects
function magnetismCalc(object_1, object_2){
    let distance_x = object_2.centre.x_vector-object_1.centre.x_vector;
    let distance_y = object_2.centre.y_vector-object_1.centre.y_vector;
    //magnitude of distance to give a scalar number distance between two centres
    let distance_magnitude = Math.sqrt(distance_x**2+distance_y**2);
    let magnetInverseSquare = 1/(distance_magnitude**2);
    if (object_1.pole === object_2.pole){
        magnetInverseSquare *= -1;
    }
    let velocity_x = distance_x*magnetInverseSquare*object_1.magnetism*object_2.magnetism;
    let velocity_y = distance_y*magnetInverseSquare*object_1.magnetism*object_2.magnetism;
    let magneticVelocity = new Vector(velocity_x, velocity_y);
    return magneticVelocity;
}

//function to check magnetism against balls currently moving
function checkMagnets(ball_1, magnet_1){
    if (ball_1.magnetic == true){
        let magneticVelocity = magnetismCalc(ball_1, magnet_1);
        if ((magneticVelocity.x_vector>0.01 || magneticVelocity.x_vector<-0.01)&&ball_1.stationary == false){
            ball_1.velocity.x_vector += magneticVelocity.x_vector;
        }
        if ((magneticVelocity.y_vector>0.01 || magneticVelocity.y_vector<-0.01)&&ball_1.stationary == false){
            ball_1.velocity.y_vector += magneticVelocity.y_vector;
        }
    }
}

//function to check two magnetic balls against each other
function checkMagneticBalls(ball_1, ball_2){
    if (ball_1.magnetic == true && ball_2.magnetic == true){
        let magneticVelocity = magnetismCalc(ball_1, ball_2);
        if (magneticVelocity.x_vector>0.01 || magneticVelocity.x_vector<-0.01){
            ball_1.velocity.x_vector += magneticVelocity.x_vector;
            ball_2.velocity.x_vector -= magneticVelocity.x_vector;       
        }
        if (magneticVelocity.y_vector>0.01 || magneticVelocity.y_vector<-0.01){
            ball_1.velocity.y_vector += magneticVelocity.y_vector;
            ball_2.velocity.y_vector -= magneticVelocity.y_vector;
        }
        if (ball_1.stationary == true){
            ball_1.velocity.x_vector = 0;
            ball_1.velocity.y_vector = 0;
        }
        if (ball_2.stationary == true){
            ball_2.velocity.x_vector = 0;
            ball_2.velocity.y_vector = 0;
        }
    }
}

function checkBlocks(ball_1, block_1){
    //left side of block
    if ((((ball_1.centre.x_vector+ball_1.radius)>=block_1.start.x_vector)
    &&(ball_1.centre.x_vector+ball_1.radius)<=(block_1.start.x_vector+(block_1.length.x_vector/10)))
    && ball_1.velocity.x_vector>0
    &&(((ball_1.centre.y_vector+ball_1.radius)>block_1.start.y_vector)
    &&(ball_1.centre.y_vector-ball_1.radius)<(block_1.start.y_vector+block_1.length.y_vector))){
        ball_1.centre.x_vector = block_1.start.x_vector-ball_1.radius;
        ball_1.velocity.x_vector *= -1;
    }
    //right side of block
    if ((((ball_1.centre.x_vector-ball_1.radius)>=(block_1.start.x_vector+(block_1.length.x_vector*(9/10))))
    &&(ball_1.centre.x_vector-ball_1.radius)<=(block_1.start.x_vector+block_1.length.x_vector))
    && ball_1.velocity.x_vector<0
    &&(((ball_1.centre.y_vector+ball_1.radius)>block_1.start.y_vector)
    &&(ball_1.centre.y_vector-ball_1.radius)<(block_1.start.y_vector+block_1.length.y_vector))){
        ball_1.centre.x_vector = block_1.start.x_vector+block_1.length.x_vector+ball_1.radius;
        ball_1.velocity.x_vector *= -1;
    }
    //top of block
    if ((((ball_1.centre.y_vector+ball_1.radius)>=block_1.start.y_vector)
    &&(ball_1.centre.y_vector+ball_1.radius)<=(block_1.start.y_vector+(block_1.length.y_vector/10)))
    && ball_1.velocity.y_vector>0
    &&(((ball_1.centre.x_vector+ball_1.radius)>block_1.start.x_vector)
    &&(ball_1.centre.x_vector-ball_1.radius)<(block_1.start.x_vector+block_1.length.x_vector))){
        ball_1.centre.y_vector = block_1.start.y_vector-ball_1.radius;
        ball_1.velocity.y_vector *= -1;
    }
    //bottom of block
    if ((((ball_1.centre.y_vector-ball_1.radius)>=(block_1.start.y_vector+(block_1.length.y_vector*(9/10))))
    &&(ball_1.centre.y_vector-ball_1.radius)<=(block_1.start.y_vector+block_1.length.y_vector))
    && ball_1.velocity.y_vector<0
    &&(((ball_1.centre.x_vector+ball_1.radius)>block_1.start.x_vector)
    &&(ball_1.centre.x_vector-ball_1.radius)<(block_1.start.x_vector+block_1.length.x_vector))){
        ball_1.centre.y_vector = block_1.start.y_vector+block_1.length.y_vector+ball_1.radius;
        ball_1.velocity.y_vector *= -1;
    }
}

//function to check for teleport zones
function checkTeleport(ball_1, teleport_1){
    //checks that the centre of the sphere (the point that would be touching the surface of the friction zone if ball
    //is considered a 2d representation of a sphere) is within the coordinates of the zone and teleports the ball to the specified area
    //if so
    if ((ball_1.centre.x_vector>=teleport_1.start.x_vector&&ball_1.centre.x_vector<=
        (teleport_1.start.x_vector+teleport_1.length.x_vector)) && 
        (ball_1.centre.y_vector>=teleport_1.start.y_vector&&ball_1.centre.y_vector<=
        (teleport_1.start.y_vector+teleport_1.length.y_vector))){
            ball_1.centre.x_vector = teleport_1.teleportPoint.x_vector
            ball_1.centre.y_vector = teleport_1.teleportPoint.y_vector
    }
}

//group of functions to avoid code repetition
function functionGroup(ball_1){
    checkEdges(ball_1);
    if (ball_1.ghost == false){
        FrictionSquareArray.forEach(square_1 => {
            checkFriction(ball_1, square_1); 
        });
        MagnetArray.forEach(magnet_1 => {
            checkMagnets(ball_1, magnet_1);
        });
        BlockArray.forEach(block_1 => {
            checkBlocks(ball_1, block_1);
        });
        TeleportArray.forEach(teleport_1 =>{
            checkTeleport(ball_1, teleport_1);
        })
    }
    addAcceleration(ball_1);
    addVelocity(ball_1);    
}

function playerControl(ball_1){
    canvas.addEventListener('keydown', function(key){
        if(key.code === "ArrowRight"){
            moveRight = true;
        }
        if(key.code === "ArrowLeft"){
            moveLeft = true;
        }
        if(key.code === "ArrowDown"){
            moveDown = true;
        }
        if(key.code === "ArrowUp"){
            moveUp = true;
        }
    });
    
    canvas.addEventListener('keyup', function(key){
        if(key.code === "ArrowRight"){
            moveRight = false;
        }
        if(key.code === "ArrowLeft"){
            moveLeft = false;
        }
        if(key.code === "ArrowDown"){
            moveDown = false;
        }
        if(key.code === "ArrowUp"){
            moveUp = false;
        }
    });

    if(moveRight == true){
        ball_1.accelerationVector.x_vector = ball_1.accelerationScalar;
    }
    if(moveLeft == true){
        ball_1.accelerationVector.x_vector = -ball_1.accelerationScalar;
    }
    if(moveDown == true){
        ball_1.accelerationVector.y_vector = ball_1.accelerationScalar;
    }
    if(moveUp == true){
        ball_1.accelerationVector.y_vector = -ball_1.accelerationScalar;
    }
    if(moveRight == false && moveLeft == false){
        ball_1.accelerationVector.x_vector = 0;
    }
    if(moveDown == false && moveUp == false){
        ball_1.accelerationVector.y_vector = 0;
    }
}

function universalToCanvasBalls(ball_1, ball_2){
    let distance = new Vector(ball_1.centre.x_vector-ball_2.centre.x_vector, ball_1.centre.y_vector-ball_2.centre.y_vector);
    let canvasPoint = new Vector(ball_1.canvasCentre.x_vector-distance.x_vector, ball_1.canvasCentre.y_vector-distance.y_vector);
    ball_2.canvasCentre.x_vector = canvasPoint.x_vector;
    ball_2.canvasCentre.y_vector = canvasPoint.y_vector;
    if ((((ball_2.canvasCentre.x_vector+ball_2.radius)>0)&&((ball_2.canvasCentre.x_vector-ball_2.radius)<width))
    &&(((ball_2.canvasCentre.y_vector+ball_2.radius)>0)&&((ball_2.canvasCentre.y_vector-ball_2.radius)<height))){
        ball_2.drawBall();
    }

}

function universalToCanvasMagnets(ball_1, magnet_1){
    let distance = new Vector(ball_1.centre.x_vector-magnet_1.centre.x_vector, ball_1.centre.y_vector-magnet_1.centre.y_vector);
    let canvasPoint = new Vector(ball_1.canvasCentre.x_vector-distance.x_vector, ball_1.canvasCentre.y_vector-distance.y_vector);
    magnet_1.canvasCentre.x_vector = canvasPoint.x_vector;
    magnet_1.canvasCentre.y_vector = canvasPoint.y_vector;
    if ((((magnet_1.canvasCentre.x_vector+magnet_1.radius)>0)&&((magnet_1.canvasCentre.x_vector-magnet_1.radius)<width))
    &&(((magnet_1.canvasCentre.y_vector+magnet_1.radius)>0)&&((magnet_1.canvasCentre.y_vector-magnet_1.radius)<height))){
        magnet_1.drawMagnet();
    }
}

function universalToCanvasBlocks(ball_1, block_1){
    let distance = new Vector(ball_1.centre.x_vector-block_1.start.x_vector, ball_1.centre.y_vector-block_1.start.y_vector);
    let canvasPoint = new Vector(ball_1.canvasCentre.x_vector-distance.x_vector, ball_1.canvasCentre.y_vector-distance.y_vector);
    block_1.canvasStart.x_vector = canvasPoint.x_vector;
    block_1.canvasStart.y_vector = canvasPoint.y_vector;
    if ((((block_1.canvasStart.x_vector+block_1.length.x_vector)>0)&&((block_1.canvasStart.x_vector)<width))
    &&(((block_1.canvasStart.y_vector+block_1.length.y_vector)>0)&&((block_1.canvasStart.y_vector)<height))){
        block_1.drawBlock();
    }
}

function universalToCanvasFrictionZones(ball_1, square_1){
    let distance = new Vector(ball_1.centre.x_vector-square_1.upperpoint.x_vector, ball_1.centre.y_vector-square_1.upperpoint.y_vector);
    let canvasPoint = new Vector(ball_1.canvasCentre.x_vector-distance.x_vector, ball_1.canvasCentre.y_vector-distance.y_vector);
    square_1.canvasStart.x_vector = canvasPoint.x_vector;
    square_1.canvasStart.y_vector = canvasPoint.y_vector;
    if ((((square_1.canvasStart.x_vector+square_1.length.x_vector)>0)&&((square_1.canvasStart.x_vector)<width))
    &&(((square_1.canvasStart.y_vector+square_1.length.y_vector)>0)&&((square_1.canvasStart.y_vector)<height))){
        square_1.drawSquare();
    }
}

function universalToCanvasBorder(ball_1, canvas_1){
    let distanceUpper = new Vector(ball_1.centre.x_vector-canvas_1.universalStart.x_vector, ball_1.centre.y_vector-canvas_1.universalStart.y_vector);
    let canvasPointUpper = new Vector(ball_1.canvasCentre.x_vector-distanceUpper.x_vector, 
    ball_1.canvasCentre.y_vector-distanceUpper.y_vector);
    canvas_1.canvasStart.x_vector = canvasPointUpper.x_vector;
    canvas_1.canvasStart.y_vector = canvasPointUpper.y_vector;
    canvas_1.drawCanvas(); 
}  

function universalToCanvasTeleporters(ball_1, teleport_1){
    let distance = new Vector(ball_1.centre.x_vector-teleport_1.start.x_vector, ball_1.centre.y_vector-teleport_1.start.y_vector);
    let canvasPoint = new Vector(ball_1.canvasCentre.x_vector-distance.x_vector, ball_1.canvasCentre.y_vector-distance.y_vector);
    teleport_1.canvasStart.x_vector = canvasPoint.x_vector;
    teleport_1.canvasStart.y_vector = canvasPoint.y_vector;
    let distanceCentre = new Vector(ball_1.centre.x_vector-teleport_1.circleCentre.x_vector, 
        ball_1.centre.y_vector-teleport_1.circleCentre.y_vector);
    let canvasPointCentre = new Vector(ball_1.canvasCentre.x_vector-distanceCentre.x_vector, 
        ball_1.canvasCentre.y_vector-distanceCentre.y_vector);
    teleport_1.canvasCentre.x_vector = canvasPointCentre.x_vector;
    teleport_1.canvasCentre.y_vector = canvasPointCentre.y_vector;
    if ((((teleport_1.canvasStart.x_vector+teleport_1.length.x_vector)>0)&&((teleport_1.canvasStart.x_vector)<width))
    &&(((teleport_1.canvasStart.y_vector+teleport_1.length.y_vector)>0)&&((teleport_1.canvasStart.y_vector)<height))){
        teleport_1.drawTeleporter();
        console.log("teleport drawn");
    }
}

function mainLoop() {    
    if (CanvasArray.length == 0){
        let defaultCanvas = new Canvas(0,0,1500,900, "black", "turquoise");
    }
    ctx.clearRect(CanvasArray[0].universalStart.x_vector, CanvasArray[0].universalStart.y_vector, 
        CanvasArray[0].length.x_vector, CanvasArray[0].length.y_vector);
    if (PlayerBallArray.length == 0 || PlayerBallArray.length >=2){
        if (PlayerBallArray.length>1){
            PlayerBallArray.forEach((ball_1) => {
                ball_1.player = false;
            });
            PlayerBallArray.splice(0, PlayerBallArray.length);
        }
        let PlayerCamera = new Ball(100, 100, 0, 0.00001, 0, 0, 0.1, false, "/", 0, false, true, true, "black", "purple");
    }
    PlayerBallArray.forEach((ball_1) => {
        CanvasArray.forEach((canvas_1) => {
            universalToCanvasBorder(ball_1, canvas_1)
        });
        
        FrictionSquareArray.forEach((square_1) => {
            universalToCanvasFrictionZones(ball_1, square_1);
        });
        TeleportArray.forEach((teleport_1) => {
            universalToCanvasTeleporters(ball_1, teleport_1);
        })
        MagnetArray.forEach((magnet_1) => {
            universalToCanvasMagnets(ball_1, magnet_1);
        });
        BlockArray.forEach((block_1) => {
            universalToCanvasBlocks(ball_1, block_1);
        });
        BallArray.forEach((ball_2) => {
            if (ball_2.player == false){
                universalToCanvasBalls(ball_1, ball_2);
            }
        });
        ball_1.drawBall();
    });
    
    BallArray.forEach((ball_1, index) => {
        if (ball_1.stationary == true){
            ball_1.velocity.x_vector = 0;
            ball_1.velocity.y_vector = 0;
        }
        if (index !== BallArray.length-1){
            for(let num = index+1; num<BallArray.length; num++){
                if (ball_1.player == true){
                    playerControl(ball_1);
                }
                if (ball_1.ghost == false && BallArray[num].ghost == false){
                    checkCollision(ball_1, BallArray[num]);
                    ballVectors(ball_1, BallArray[num]);
                    checkMagneticBalls(ball_1, BallArray[num]);
                }
            }
            functionGroup(ball_1);
        } else {
            if (ball_1.player == true){
                playerControl(ball_1);
            }
            functionGroup(ball_1);
        }
        if (ball_1.stationary == false && ball_1.ghost == false){
            ball_1.speedDisplay();
        }
    });
    requestAnimationFrame(mainLoop);
}
export { mainLoop, FrictionZone, Ball, Magnet, Block, Canvas, Teleporter};