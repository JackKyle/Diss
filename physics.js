//importing variables from engineconfig to do with canvas properties
import { canvas, ctx, width, height } from './engineConfig.js';
//creation of arrays to hold objects of each class
const BallArray = [];
const PlayerBallArray = [];
const FrictionSquareArray = [];
const MagnetArray = [];
const BlockArray = [];
const CanvasArray = [];
const TeleportArray = [];
//booleans used for ball movement for players 
let moveLeft = false;
let moveRight = false;
let moveDown = false;
let moveUp = false;

//vector class used for storing x and y directions and coordinates for variables in classes and objects
class Vector{
    //constructor for vector class
    constructor(xvector, yvector){
        this.x_vector = xvector;
        this.y_vector = yvector;
    }   
    //method to get magnitude of variable
    magnitude(){
        return Math.sqrt(this.x_vector**2 + this.y_vector**2);
    } 
    //method to get dot product of vector
    dotproduct(vector_2){
        return ((this.x_vector*vector_2.x_vector)+(this.y_vector*vector_2.y_vector));
    }
}

class Circle{
    constructor (xpoint, ypoint, radius, outline, fill){
        //setting centre as vector so that both x and y positions can be held 
        this.centre = new Vector(xpoint,ypoint);
        this.radius = radius;
        //sets canvas centre as 0,0 for default as will be corrected based on player/camera ball
        this.canvasCentre = new Vector(0,0);
        this.outline = outline;
        this.fill = fill;
    }
}

class Rectangle{
    constructor (xstart,ystart,xlength,ylength, outline, fill){
        //start stored in vector as has x and y components
        this.start = new Vector(xstart,ystart);
        //if statement to set default length as at least 1
        if (xlength<=0){
            xlength = 1;
        }
        if (ylength<=0){
            ylength = 1;
        }
        //length stored in vector as has x and y components
        this.length = new Vector (xlength,ylength);
        //sets canvas start as 0,0 for default as will be corrected based on player/camera ball
        this.canvasStart = new Vector(0,0);
        this.outline = outline;
        this.fill = fill;
    }
}

//ball class used for creation of ball objects
class Ball extends Circle{
    //constructor used to construct ball object, with corrections for any potential incorrect entries in construction of ball
    constructor(xpoint, ypoint, radius, mass, velocityx, velocityy, maxVelocity, accelerationScalar, magnetic, pole, magnetism,
        stationary, player, ghost, outline, fill){
        //sets radius as 1 so ball is visible if the radius entred is less than or equal to 0 unless the ball is a ghost property 
        if (radius<=0 && ghost == false){
            radius = 1;
        } else if (radius<0&&ghost==true) {
            radius = 0;
        } 
        //super used to set all required variables of circular object from parent constructor
        super(xpoint, ypoint, radius, outline, fill);
        //if statement to catch if mass is less than or equal to 0, negative values are impossible
        //and a value of 0 will cause problems with collision resolution
        if (mass<=0){
            this.mass = 0.00001;
        } else{
            this.mass = mass;
        }
        //if statement to ensure magnetic is true or false
        if (magnetic !== false && magnetic !== true){
            magnetic = false;
        }
        this.magnetic = magnetic;
        //if statement to ensure magnetism isn't below 0
        if (magnetism<0){
            magnetism = 0;
        }
        //sets pole and magnetism only if the magnetic value is true
        if (this.magnetic == true){
            this.pole = pole;    
            this.magnetism = magnetism;
        } else {
            this.pole = "N/A";
            this.magnetism = 0;
        }
        //sets velocity as vector object so it can contain x and y components
        this.velocity = new Vector(velocityx,velocityy);
        this.maxVelocity = maxVelocity;
        //sets acceleration scalar to positive of value entered if negative value entered
        if (accelerationScalar <0){
            accelerationScalar *= -1;
        }
        this.accelerationScalar = accelerationScalar;
        //acceleration vector set to 0
        this.accelerationVector = new Vector(0,0);
        //if statement to ensure stationary is true or false
        if (stationary!== true && stationary!== false){
            stationary = false;
        }
        this.stationary = stationary;
        //if statement to ensure player is true or false
        if (player!== true && player!== false){
            player = false;
        }
        this.player = player;
        //if statement to correctly set camera for the ball when player and adds to player array
        if (this.player == true){
            this.canvasCentre.x_vector = (width/2);
            this.canvasCentre.y_vector = (height/2);
            PlayerBallArray.push(this);
        } 
        //if statement to ensure ghost is true or false
        if (ghost!== true && ghost!== false){
            ghost = false;
        }
        this.ghost = ghost;
        //sets frictioncheck to false if not
        this.frictionCheck = false;
        //adds object to ball array
        BallArray.push(this);
    }
}

//friction zone class for creation of friction zone object
class FrictionZone extends Rectangle{
    //constructor used to create friction zone object with potential corrections for properties
    constructor(xstart, ystart, xlength, ylength, outline, fill, friction){
        //super used to set all required variables of rectangular object from parent constructor
        super(xstart,ystart,xlength,ylength, outline, fill);
        //if statement so that friction value can not be greater than 1
        if (friction>1){
            friction = 1;
        }
        this.friction = friction;
        //adds friction zone to array
        FrictionSquareArray.push(this);
    }
}

//magnet class for creation of magnet objects
class Magnet extends Circle{
    //constructor used to create magnet objects with potential corrections if required for properties
    constructor(xpoint, ypoint, radius, magnetism, pole, outline, fill){
        //if statement to stop radius being 0 or less
        if (radius<=0){
            radius = 1;
        } 
        //super used to set all required variables of circular object from parent constructor
        super(xpoint,ypoint,radius,outline,fill);
        //if statement to stop magnetism being less than 0
        if (magnetism<0){
            magnetism = 0;
        }
        this.magnetism = magnetism;
        this.pole = pole;
        //adds magnet object to magnet array
        MagnetArray.push(this);
    }
}

//block class for creation of block object 
class Block extends Rectangle{
    //constructor used to create block objects with potential corrections
    constructor(xstart, ystart, xlength, ylength, outline, fill){
        //super used to set all required variables of rectangular object from parent constructor
        super(xstart,ystart,xlength,ylength, outline, fill);
        //block added to block array
        BlockArray.push(this);
    }

}

//canvas class used to construct canvas objects
class Canvas extends Rectangle{
    //constructor used to create canvas object with potential corrections
    constructor(xstart, ystart, xlength, ylength, friction, outline, fill){
        //super used to set all required variables of rectangular object from parent constructor
        super(xstart,ystart,xlength,ylength, outline, fill);
        //canvas start set as 0,0 by default before being changed to centre round player/camera
        if (friction>1){
            friction = 1;
        }
        this.friction = friction;
        //canvas added to array for access
        CanvasArray.push(this);
    }
}

//teleporter class to construct teleporter objects
class Teleporter extends Rectangle{
    //constructor method to create teleporter object with potential corrections
    constructor(xstart, ystart, xlength, ylength, xteleport, yteleport, outline, fill, circle){
        //super used to set all required variables of rectangular object from parent constructor
        super(xstart,ystart,xlength,ylength, outline, fill);
        //teleport point held as vector with x and y component
        this.teleportPoint = new Vector (xteleport, yteleport);
        //canvas point set as 0,0 by default before being corrected for player/camera
        this.canvasTeleportPoint = new Vector(0,0);
        this.circle = circle;
        //circle centre set as vector with x and y components
        this.circleCentre = new Vector (this.start.x_vector+(xlength/2),this.start.y_vector+(ylength/2));
        //canvas centre set as 0,0 by default to be corrected based on player/camera
        this.canvasCentre = new Vector (0,0);
        //if statement so that radius will be pased on shorter component of rectangle of teleporter
        if (xlength>ylength){
            this.radius = ylength/5;
        } else {
            this.radius = xlength/5;
        }
        //teleporter added to teleporter array
        TeleportArray.push(this);
    }
    //draw teleporter method added as it uses both circle and rectangle drawing
    drawTeleporter(){
        drawRectangle(this);
        ctx.beginPath();
        ctx.arc(this.canvasCentre.x_vector, this.canvasCentre.y_vector, this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.circle;
        ctx.fill();
        ctx.closePath();
    }
}
//draw rectangle function takes in rectangle objects and displays them on canvas
function drawRectangle (object_1){
    ctx.beginPath();
    ctx.rect(object_1.canvasStart.x_vector, object_1.canvasStart.y_vector, object_1.length.x_vector, object_1.length.y_vector);
    ctx.strokestyle = object_1.outline;
    ctx.stroke();
    ctx.fillStyle = object_1.fill;
    ctx.fill();
    ctx.closePath();
}

//draw circle function takes in circle objects and displays them on canvas
function drawCircle (object_1){
    ctx.beginPath();
    ctx.arc(object_1.canvasCentre.x_vector, object_1.canvasCentre.y_vector, object_1.radius, 0, 2*Math.PI);
    ctx.strokeStyle = object_1.outline;
    ctx.stroke();
    ctx.fillStyle = object_1.fill;
    ctx.fill();
    ctx.closePath();
}

//check collision function will take in two balls and check for penetration and if it exists then it will separate the balls
function checkCollision (ball_1, ball_2){
    //distance between two centres in x and y directions
    let distance_x = ball_1.centre.x_vector-ball_2.centre.x_vector;
    let distance_y = ball_1.centre.y_vector-ball_2.centre.y_vector;
    //magnitude of distance to give a scalar number distance between two centres
    let distanceMagnitude = Math.sqrt(distance_x**2+distance_y**2);
    if (ball_1.radius+ball_2.radius>distanceMagnitude){
        //overlap between balls (if 0 then no overlap)
        let difference = ball_1.radius+ball_2.radius - distanceMagnitude;
        //calculating amount of distance each ball must be moved to make them no longer overlap but still touch
        //calculated by taking the total distance in each plane and dividing it by the total distance magnitude and multiplying 
        //it by the overlap divided by two so that it takes the fact they are each moving half the distance into account
        //each is then added to ball 1 and subtracted from ball 2 in order to ensure each ball moves an equal amount 
        //from the other, producing no overlap in the end
        let move_x = (distance_x/distanceMagnitude)*(difference/2);
        let move_y = (distance_y/distanceMagnitude)*(difference/2);
        //if statement to check that the balls only move if they aren't stationary
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

//function to resolve collisions between two balls
function ballVectors(ball_1, ball_2){
    //distance between two centres in x and y directions
    let distance_x = ball_1.centre.x_vector-ball_2.centre.x_vector;
    let distance_y = ball_1.centre.y_vector-ball_2.centre.y_vector;
    //magnitude of distance to give a scalar number distance between two centres
    let distanceMagnitude = Math.sqrt(distance_x**2+distance_y**2);
    if (ball_1.radius+ball_2.radius>=distanceMagnitude){
        //normal vector of collision found from taking centre of circle 1 from centre of circle 2
        let normalVector = new Vector(ball_2.centre.x_vector - ball_1.centre.x_vector, 
        ball_2.centre.y_vector - ball_1.centre.y_vector);
        //unit vector of normal found from dividing both components of vector by magnitude
        let unitNormalVector = new Vector(normalVector.x_vector/normalVector.magnitude(), 
        normalVector.y_vector/normalVector.magnitude());
        //get unit tangent vector of collision 
        let unitTangentVector = new Vector(unitNormalVector.y_vector*-1, unitNormalVector.x_vector);
        //get initial ball 1 normal direction velocity by taking dot product of ball's velocity and that of the unit normal vector
        let initialBall1Normal = ball_1.velocity.dotproduct(unitNormalVector);
        //get initial ball 1 tangent direction velocity by taking dot product of ball's velocity and that of unit tangent vector
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
    //if statement to check acceleration vector is enough to be added and not negligible
    if (ball_1.accelerationVector.x_vector>0.01 || ball_1.accelerationVector.x_vector<-0.01){
        //if statement so that acceleration is added when the velocity is below max velocity
        if (ball_1.accelerationVector.x_vector>0){
            if (ball_1.velocity.x_vector<ball_1.maxVelocity){
            ball_1.velocity.x_vector += ball_1.accelerationVector.x_vector;
            }
        }
        if (ball_1.accelerationVector.x_vector<0){
            if (ball_1.velocity.x_vector>-1*ball_1.maxVelocity){
            ball_1.velocity.x_vector += ball_1.accelerationVector.x_vector;
            }
        }  
    }
    //if statement to check acceleration vector is enough to be added and not negligible
    if (ball_1.accelerationVector.y_vector>0.01 || ball_1.accelerationVector.y_vector<-0.01){
        //if statement so that acceleration is added when the velocity is below max velocity
        if (ball_1.accelerationVector.y_vector>0){
            if (ball_1.velocity.y_vector<ball_1.maxVelocity){
            ball_1.velocity.y_vector += ball_1.accelerationVector.y_vector;
            }
        }
        if (ball_1.accelerationVector.y_vector<0){
            if (ball_1.velocity.y_vector>-1*ball_1.maxVelocity){
            ball_1.velocity.y_vector += ball_1.accelerationVector.y_vector;
            }
        }
    }
}

//function to add velocity to the placement of the ball
function addVelocity(ball_1){
    //velocities added to position of ball to move it
    ball_1.centre.x_vector += ball_1.velocity.x_vector;
    ball_1.centre.y_vector += ball_1.velocity.y_vector;
}

//function to check for friction zones
function checkFriction(ball_1, friction_1){
    //only checks friction zone if the friction check is false 
    if (ball_1.frictionCheck == false){
        //checks that the centre of the ball (the point that would be touching the surface of the friction zone if ball
        //is considered a 2d representation of a sphere) is within the coordinates of the zone and applies friction of
        //zone to the ball
        if ((ball_1.centre.x_vector>=friction_1.start.x_vector&&ball_1.centre.x_vector<=
            (friction_1.start.x_vector+friction_1.length.x_vector)) && 
            (ball_1.centre.y_vector>=friction_1.start.y_vector&&ball_1.centre.y_vector<=
            (friction_1.start.y_vector+friction_1.length.y_vector))){
            //reduces velocity with friction factor
            ball_1.velocity.x_vector *= 1 - friction_1.friction;
            ball_1.velocity.y_vector *= 1 - friction_1.friction;
            //sets friction check as true for this loop for this ball as ball has already had friction calculations applied
            ball_1.frictionCheck = true;
        }
    }
}

//function to check if the ball is against the edges 
function checkEdges(ball_1, canvas_1){
    //checks that ball isn't past border of screen and reverses vector dependent on side it hits
    //also brings ball back to edge if it were to cross the border due to the small jumps the ball
    //actually makes to simulate movement
    if (((ball_1.centre.x_vector-ball_1.radius) <= canvas_1.start.x_vector ||
     ball_1.centre.x_vector >= (canvas_1.start.x_vector + canvas_1.length.x_vector-ball_1.radius))){
        if (ball_1.centre.x_vector<=ball_1.radius){
            ball_1.centre.x_vector = canvas_1.start.x_vector+ball_1.radius;
        } else if (ball_1.centre.x_vector >= (canvas_1.length.x_vector-ball_1.radius)){
            ball_1.centre.x_vector = canvas_1.length.x_vector - ball_1.radius;
        }
        ball_1.velocity.x_vector = -1 * ball_1.velocity.x_vector;
    }
    //checks that ball isn't past border of screen and reverses vector dependent on side it hits
    //also brings ball back to edge if it were to cross the border due to the small jumps the ball
    //actually makes to simulate movement
    if (((ball_1.centre.y_vector-ball_1.radius) <= canvas_1.start.y_vector ||
    ball_1.centre.y_vector >= (canvas_1.start.y_vector + canvas_1.length.y_vector-ball_1.radius))){
        if (ball_1.centre.y_vector<=ball_1.radius){
            ball_1.centre.y_vector = ball_1.radius;
        } else if (ball_1.centre.y_vector >= (canvas_1.length.y_vector-ball_1.radius)){
            ball_1.centre.y_vector = canvas_1.length.y_vector - ball_1.radius;
        }
        ball_1.velocity.y_vector = ball_1.velocity.y_vector * -1;
    }
}

//function for checking magnetism in objects
function magnetismCalc(object_1, object_2){
    //distances calculated in x and y as centres from objects
    let distance_x = object_2.centre.x_vector-object_1.centre.x_vector;
    let distance_y = object_2.centre.y_vector-object_1.centre.y_vector;
    //magnitude of distance to give a scalar number distance between two centres
    let distanceMagnitude = Math.sqrt(distance_x**2+distance_y**2);
    //magnetic inverse square given as 1/distance^2 to have distance between magnetic objects
    //affect value of magnetic velocities
    let magnetInverseSquare = 1/(distanceMagnitude**2);
    if (object_1.pole === object_2.pole){
        //multiplies value by -1 so that balls repel if poles are the same
        magnetInverseSquare *= -1;
    }
    let signCheck_x = 1;
    let signCheck_y = 1;
    if (distance_x<0){
        signCheck_x *= -1;
    }
    if (distance_y<0){
        signCheck_y *=-1;
    }
    //magnetic velocity is a vector to hold x and y components 
    let magneticVelocity = new Vector(signCheck_x*magnetInverseSquare*object_1.magnetism*object_2.magnetism,
        signCheck_y*magnetInverseSquare*object_1.magnetism*object_2.magnetism);
    //magnetic velocity returned to other methods for use in calculations between 2 balls or ball and magnet
    return magneticVelocity;
}

//function to check magnetism against balls currently moving
function checkMagnets(ball_1, magnet_1){
    //magnetic velocity calculated by method
    let magneticVelocity = magnetismCalc(ball_1, magnet_1);
    //mass of ball taken into consideration for calculation of velocity
    magneticVelocity.x_vector *= 1/ball_1.mass;
    magneticVelocity.y_vector *= 1/ball_1.mass;
    //magnetic velocity only added if value not negligible 
    if ((magneticVelocity.x_vector>0.03 || magneticVelocity.x_vector<-0.03)&&ball_1.stationary == false){
        ball_1.velocity.x_vector += magneticVelocity.x_vector;
    }
    if ((magneticVelocity.y_vector>0.03 || magneticVelocity.y_vector<-0.03)&&ball_1.stationary == false){
        ball_1.velocity.y_vector += magneticVelocity.y_vector;
    }
}

//function to check two magnetic balls against each other
function checkMagneticBalls(ball_1, ball_2){
    //magnetic velocity calculated from method
    let magneticVelocity = magnetismCalc(ball_1, ball_2);
    //magnetic velocity for balls calculated taking into consideration the mass of both balls along 
    //with the other magnetic velocity calculated
    let magneticVelocity_1 = new Vector (magneticVelocity.x_vector*(ball_2.mass/(ball_1.mass+ball_2.mass)),
    magneticVelocity.y_vector*(ball_2.mass/(ball_1.mass+ball_2.mass)));
    let magneticVelocity_2 = new Vector (magneticVelocity.x_vector*(ball_1.mass/(ball_1.mass+ball_2.mass)),
    magneticVelocity.y_vector*(ball_1.mass/(ball_1.mass+ball_2.mass)));


    //if magnetic velocity in x not negligible then it is added to velocities of balls
    if (magneticVelocity.x_vector>0.03 || magneticVelocity.x_vector<-0.03){
        //second check to make sure magnetic velocity in x for ball 1 specifically is not negligible
        if (magneticVelocity_1.x_vector>0.03 || magneticVelocity_1.x_vector<-0.03){
            //adds the velocity with both balls' mass considered only if both aren't stationary, 
            //otherwise adds original magnetic velocity without mass consideration if ball 1 isn't 
            //stationary
            if (ball_2.stationary == false && ball_1.stationary== false){
                ball_1.velocity.x_vector += magneticVelocity_1.x_vector;
            } else if (ball_1.stationary == false) {
                ball_1.velocity.x_vector += magneticVelocity.x_vector;
                //console.log(magneticVelocity.x_vector);
                //console.log(ball_1.velocity.x_vector);
            }
        }
        //second check to make sure magnetic velocity in x for ball 2 specifically is not negligible
        if (magneticVelocity_2.x_vector>0.03 || magneticVelocity_2.x_vector<-0.03){
            //adds the velocity with both balls' mass considered only if both aren't stationary, 
            //otherwise adds original magnetic velocity without mass consideration if ball 2 isn't 
            //stationary
            if (ball_1.stationary == false && ball_2.stationary == false){
                ball_2.velocity.x_vector -= magneticVelocity_2.x_vector;
            } else if (ball_2.stationary == false) {
                ball_2.velocity.x_vector -= magneticVelocity.x_vector;
            }     
        }
    }
    //if magnetic velocity in y not negligible then it is added to velocities of balls
    if (magneticVelocity.y_vector>0.03||magneticVelocity.y_vector<-0.03){
        //second check to make sure magnetic velocity in y for ball 1 specifically is not negligible
        if (magneticVelocity_1.y_vector>0.03 || magneticVelocity_1.y_vector<-0.03){
            //adds the velocity with both balls' mass considered only if both aren't stationary, 
            //otherwise adds original magnetic velocity without mass consideration if ball 1 isn't 
            //stationary
            if (ball_2.stationary == false && ball_1.stationary == false){
                ball_1.velocity.y_vector += magneticVelocity_1.y_vector;
            } else if (ball_1.stationary == false) {
                ball_1.velocity.y_vector += magneticVelocity.y_vector;
                //console.log(magneticVelocity.y_vector);
                //console.log(ball_1.velocity.y_vector);
            }
        }
        //second check to make sure magnetic velocity in y for ball 2 specifically is not negligible
        if (magneticVelocity_2.y_vector>0.03 || magneticVelocity_2.y_vector<-0.03){
            //adds the velocity with both balls' mass considered only if both aren't stationary, 
            //otherwise adds original magnetic velocity without mass consideration if ball 2 isn't 
            //stationary
            if (ball_1.stationary == false && ball_2.stationary == false){
                ball_2.velocity.y_vector -= magneticVelocity_2.y_vector;
            } else if (ball_2.stationary == false) {
                ball_2.velocity.y_vector -= magneticVelocity.y_vector;
            }
        }
    }
}

//function to check if ball collides with a block and resolve the collision if so
function checkBlocks(ball_1, block_1){
    //checks that the ball is within the limits of the block and then checks which side is being hit 
    //with the velocity in the x direction needing to be positive to strike the left side, and also
    //hitting within a range of the left side for the purpose of ensuring that it does not consider 
    //the ball to have hit the left and the top or the left and the bottom when the ball hits either 
    //the top or the bottom of the block while travelling right, as this would result in the ball reversing 
    //both x and y velocities 
    if ((((ball_1.centre.x_vector+ball_1.radius)>=block_1.start.x_vector)
    &&(ball_1.centre.x_vector+ball_1.radius)<=(block_1.start.x_vector+(block_1.length.x_vector/10)))
    && ball_1.velocity.x_vector>0
    &&(((ball_1.centre.y_vector+ball_1.radius)>=block_1.start.y_vector)
    &&(ball_1.centre.y_vector-ball_1.radius)<=(block_1.start.y_vector+block_1.length.y_vector))){
        ball_1.centre.x_vector = block_1.start.x_vector-ball_1.radius;
        ball_1.velocity.x_vector *= -1;
    } 
    //checks that the ball is within the limits of the block and then checks which side is being hit 
    //with the velocity in the x direction needing to be negative to strike the right side, and also
    //hitting within a range of the right side for the purpose of ensuring that it does not consider 
    //the ball to have hit the right and the top or the right and the bottom when the ball hits either 
    //the top or the bottom of the block while travelling left, as this would result in the ball reversing 
    //both x and y velocities
    else if ((((ball_1.centre.x_vector-ball_1.radius)>=(block_1.start.x_vector+(block_1.length.x_vector*(9/10))))
    &&(ball_1.centre.x_vector-ball_1.radius)<=(block_1.start.x_vector+block_1.length.x_vector))
    && ball_1.velocity.x_vector<0
    &&(((ball_1.centre.y_vector+ball_1.radius)>=block_1.start.y_vector)
    &&(ball_1.centre.y_vector-ball_1.radius)<=(block_1.start.y_vector+block_1.length.y_vector))){
        ball_1.centre.x_vector = block_1.start.x_vector+block_1.length.x_vector+ball_1.radius;
        ball_1.velocity.x_vector *= -1;
    } 
    //checks that the ball is within the limits of the block and then checks which side is being hit 
    //with the velocity in the y direction needing to be positive to strike the top side, and also
    //hitting within a range of the top side for the purpose of ensuring that it does not consider 
    //the ball to have hit the right and the top or the left and the top when the ball hits either 
    //the left or the right of the block while travelling down, as this would result in the ball reversing 
    //both x and y velocities
    else if ((((ball_1.centre.y_vector+ball_1.radius)>=block_1.start.y_vector)
    &&(ball_1.centre.y_vector+ball_1.radius)<=(block_1.start.y_vector+(block_1.length.y_vector/10)))
    && ball_1.velocity.y_vector>0
    &&(((ball_1.centre.x_vector+ball_1.radius)>=block_1.start.x_vector)
    &&(ball_1.centre.x_vector-ball_1.radius)<=(block_1.start.x_vector+block_1.length.x_vector))){
        ball_1.centre.y_vector = block_1.start.y_vector-ball_1.radius;
        ball_1.velocity.y_vector *= -1;
    } 
    //checks that the ball is within the limits of the block and then checks which side is being hit 
    //with the velocity in the y direction needing to be negative to strike the bottom side, and also
    //hitting within a range of the bottom side for the purpose of ensuring that it does not consider 
    //the ball to have hit the right and the bottom or the left and the bottom when the ball hits either 
    //the left or the right of the block while travelling up, as this would result in the ball reversing 
    //both x and y velocities
    else if ((((ball_1.centre.y_vector-ball_1.radius)>=(block_1.start.y_vector+(block_1.length.y_vector*(9/10))))
    &&(ball_1.centre.y_vector-ball_1.radius)<=(block_1.start.y_vector+block_1.length.y_vector))
    && ball_1.velocity.y_vector<0
    &&(((ball_1.centre.x_vector+ball_1.radius)>=block_1.start.x_vector)
    &&(ball_1.centre.x_vector-ball_1.radius)<(block_1.start.x_vector+block_1.length.x_vector))){
        ball_1.centre.y_vector = block_1.start.y_vector+block_1.length.y_vector+ball_1.radius;
        ball_1.velocity.y_vector *= -1;
    }
}

//function to check for teleport zones
function checkTeleport(ball_1, teleport_1){
    //checks that the centre of the sphere (the point that would be touching the surface of the teleport zone if ball
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

//function to check when the player presses keys and take action when they do
function playerControl(ball_1){
    //event listener waits for the player to press a key
    canvas.addEventListener('keydown', function(key){
        //checks for the four arrow keys and if they are pressed then the boolean associated is set to true
        //which will be used in a check for when the acceleration should be added to the velocity
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
    //if statement so that the event listener for keys being released is only done when one key is currently pressed
    //to help performance as less code will need to be performed each loop when not checking for a key to be released
    //when none are pressed
    if (moveRight == true || moveLeft == true || moveDown == true || moveUp == true){
        //event listener to wait for keys to be released so booleans for each key can be set back to false
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
    }
    //only checks through each boolean if one is true to save some performance
    if (moveRight == true || moveLeft == true || moveDown == true || moveUp == true){
        //if booleans are true then acceleration vectors will be added to in appropriate direction
        //if the direction would be negative in terms of the canvas then the scalar is multiplied by -1
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
    }
    //if neither arrows in x directions are pressed then then acceleration is set back to 0 for x 
    if(moveRight == false && moveLeft == false){
        ball_1.accelerationVector.x_vector = 0;
    }
    //if neither arrows in y directions are pressed then then acceleration is set back to 0 for y
    if(moveDown == false && moveUp == false){
        ball_1.accelerationVector.y_vector = 0;
    }
}

//function that will take the distance of each ball from the player/camera ball and move it appropriately in the 
//canvas coordinates
function universalToCanvasCircles(ball_1, object_2){
    //distance between ball centres taken in actual coordinates
    let distance = new Vector(ball_1.centre.x_vector-object_2.centre.x_vector, ball_1.centre.y_vector-object_2.centre.y_vector);
    //canvas point is new vector that will get the coordinates for where ball 2 will be placed compared to ball 1
    let canvasPoint = new Vector(ball_1.canvasCentre.x_vector-distance.x_vector, ball_1.canvasCentre.y_vector-distance.y_vector);
    //ball 2's points now set as canvas points calculated as above
    object_2.canvasCentre.x_vector = canvasPoint.x_vector;
    object_2.canvasCentre.y_vector = canvasPoint.y_vector;
    //if statement to ensure ball is only drawn if it could appear on screen
    if ((((object_2.canvasCentre.x_vector+object_2.radius)>0)&&((object_2.canvasCentre.x_vector-object_2.radius)<width))
    &&(((object_2.canvasCentre.y_vector+object_2.radius)>0)&&((object_2.canvasCentre.y_vector-object_2.radius)<height))){
        drawCircle(object_2)
    }

}

//function that will take the distance of each block from the player/camera ball and move it appropriately in the 
//canvas coordinates
function universalToCanvasRectangles(ball_1, object_2){
    //distance between player centre and block top left corner taken in actual coordinates
    let distance = new Vector(ball_1.centre.x_vector-object_2.start.x_vector, ball_1.centre.y_vector-object_2.start.y_vector);
    //canvas point is new vector that will get the coordinates for where block top left corner will be placed compared to the player
    let canvasPoint = new Vector(ball_1.canvasCentre.x_vector-distance.x_vector, ball_1.canvasCentre.y_vector-distance.y_vector);
    //block's points now set as canvas points calculated as above
    object_2.canvasStart.x_vector = canvasPoint.x_vector;
    object_2.canvasStart.y_vector = canvasPoint.y_vector;
    //if statement to ensure block is only drawn if it could appear on screen
    if ((((object_2.canvasStart.x_vector+object_2.length.x_vector)>0)&&((object_2.canvasStart.x_vector)<width))
    &&(((object_2.canvasStart.y_vector+object_2.length.y_vector)>0)&&((object_2.canvasStart.y_vector)<height))){
        drawRectangle(object_2);
    }
}

//function that will take the distance of each teleporter from the player/camera ball and move it appropriately in the 
//canvas coordinates
function universalToCanvasTeleporters(ball_1, teleport_1){
    //distance between player centre and teleporter top left corner taken in actual coordinates
    let distance = new Vector(ball_1.centre.x_vector-teleport_1.start.x_vector, ball_1.centre.y_vector-teleport_1.start.y_vector);
    //canvas point is new vector that will get the coordinates for the teleporter top left corner will be placed compared to the player
    let canvasPoint = new Vector(ball_1.canvasCentre.x_vector-distance.x_vector, ball_1.canvasCentre.y_vector-distance.y_vector);
    //teleporter's points now set as canvas points calculated as above
    teleport_1.canvasStart.x_vector = canvasPoint.x_vector;
    teleport_1.canvasStart.y_vector = canvasPoint.y_vector;
    //distance between player centre and teleporter circle centre taken in actual coordinates
    let distanceCentre = new Vector(ball_1.centre.x_vector-teleport_1.circleCentre.x_vector, 
        ball_1.centre.y_vector-teleport_1.circleCentre.y_vector);
    //canvas point is new vector that will get the coordinates for the teleporter circle centre will be placed compared to the player
    let canvasPointCentre = new Vector(ball_1.canvasCentre.x_vector-distanceCentre.x_vector, 
        ball_1.canvasCentre.y_vector-distanceCentre.y_vector);
    //teleporter's points now set as canvas points calculated as above
    teleport_1.canvasCentre.x_vector = canvasPointCentre.x_vector;
    teleport_1.canvasCentre.y_vector = canvasPointCentre.y_vector;
    //if statement to ensure teleporter is only drawn if it could appear on screen
    if ((((teleport_1.canvasStart.x_vector+teleport_1.length.x_vector)>0)&&((teleport_1.canvasStart.x_vector)<width))
    &&(((teleport_1.canvasStart.y_vector+teleport_1.length.y_vector)>0)&&((teleport_1.canvasStart.y_vector)<height))){
        teleport_1.drawTeleporter();
    }
}

//group of functions to avoid code repetition
function functionGroup(ball_1){
    //edges checked for every ball
    checkEdges(ball_1, CanvasArray[0]);
    //if statement to ensure ghost balls aren't checked against other objects so they can move freely
    if (ball_1.ghost == false){
        //sets friction check false so friction will apply, whether by canvas or friction zone depending on ball location
        ball_1.frictionCheck = false;
        //if statement to ensure ball isn't checked against magnets unless magnetic 
        if (ball_1.magnetic == true){
            //ball checked against each magnet
            MagnetArray.forEach(magnet_1 => {
                checkMagnets(ball_1, magnet_1);
            });
        }
        //ball checked against each block
        BlockArray.forEach(block_1 => {
            checkBlocks(ball_1, block_1);
        });
    }
    //checks ball has any acceleration before checking to add it to velocity, means only player ball is checked in current build
    //saves time with checking each ball in this method
    if (ball_1.accelerationVector.x_vector !== 0 || ball_1.accelerationVector.y_vector !== 0){
        addAcceleration(ball_1);
    }
    if (ball_1.ghost == false){
        //checks ball against each friction zone to check if ball is on any
        FrictionSquareArray.forEach(friction_1 => {
            checkFriction(ball_1, friction_1); 
        });
    }
    //checks ball is not checked for friction already before considering friction from canvas (also ensure canvas does not affect ghost)
    if (ball_1.frictionCheck == false && ball_1.ghost == false){
        ball_1.velocity.x_vector *= 1-CanvasArray[0].friction;
        ball_1.velocity.y_vector *= 1-CanvasArray[0].friction;
        ball_1.frictionCheck = true;
    }
    //added so camera is easier to control, will slow down but only if ball is ghost and player controlled
    if (ball_1.ghost == true && ball_1.player == true){
        ball_1.velocity.x_vector *= 1-0.025;
        ball_1.velocity.y_vector *= 1-0.025;
    }
    //only adds velocity if it isn't negligible
    if ((ball_1.velocity.x_vector > 0.01 || ball_1.velocity.x_vector<-0.01) 
    || (ball_1.velocity.y_vector > 0.01 || ball_1.velocity.y_vector<-0.01)) {
        addVelocity(ball_1);
    }
}

//method for initial launch of the physics engine to ensure things are created correctly
function initiate(){
    //if statement to check that there is a canvas and if not then one is created.
    if (CanvasArray.length == 0 || CanvasArray.length >= 2){
        //if there is more than 1 then canvases are removed so they won't be acknowledged
        if (CanvasArray.length>1){
            CanvasArray.splice(0, CanvasArray.length);
        }
        let DefaultCanvas = new Canvas(0,0,1500,900, 0, "black", "turquoise");
    }
    //checks that each ball will appear within limits of canvas
    BallArray.forEach((ball_1) => {
        if (ball_1.centre.x_vector-ball_1.radius<CanvasArray[0].start.x_vector || ball_1.centre.x_vector+ball_1.radius
            > (CanvasArray[0].start.x_vector+CanvasArray[0].length.x_vector)){
                ball_1.centre.x_vector = CanvasArray[0].start.x_vector+ball_1.radius;
            }
        if (ball_1.centre.y_vector-ball_1.radius<CanvasArray[0].start.y_vector || ball_1.centre.y_vector+ball_1.radius
            > (CanvasArray[0].start.y_vector+CanvasArray[0].length.y_vector)){
                ball_1.centre.y_vector = CanvasArray[0].start.y_vector+ball_1.radius;
            }
    });
    //checks that each magnet will appear within limits of canvas
    MagnetArray.forEach((magnet_1) => {
        if (magnet_1.centre.x_vector-magnet_1.radius<CanvasArray[0].start.x_vector || magnet_1.centre.x_vector+magnet_1.radius
            > (CanvasArray[0].start.x_vector+CanvasArray[0].length.x_vector)){
                magnet_1.centre.x_vector = CanvasArray[0].start.x_vector+magnet_1.radius;
            }
        if (magnet_1.centre.y_vector-magnet_1.radius<CanvasArray[0].start.y_vector || magnet_1.centre.y_vector+magnet_1.radius
            > (CanvasArray[0].start.y_vector+CanvasArray[0].length.y_vector)){
                magnet_1.centre.y_vector = CanvasArray[0].start.y_vector+magnet_1.radius;
            }
    })
    //checks that each block will appear within limits of canvas
    BlockArray.forEach((block_1) => {
        if (block_1.start.x_vector<CanvasArray[0].start.x_vector || 
            block_1.start.x_vector+block_1.length.x_vector 
            > (CanvasArray[0].start.x_vector+CanvasArray[0].length.x_vector)){
                //ensures that if block's length is greater than canvas's it will be reduced to fit
                if (block_1.length.x_vector>CanvasArray[0].length.x_vector){
                    block_1.length.x_vector = CanvasArray[0].length.x_vector;
                } 
                block_1.start.x_vector = CanvasArray[0].start.x_vector;
            }
        if (block_1.start.y_vector<CanvasArray[0].start.y_vector || 
            block_1.start.y_vector+block_1.length.y_vector 
            > (CanvasArray[0].start.y_vector+CanvasArray[0].length.y_vector)){
                //ensures that if block's height is greater than canvas's it will be reduced to fit
                if (block_1.length.y_vector>CanvasArray[0].length.y_vector){
                    block_1.length.y_vector = CanvasArray[0].length.y_vector;
                } 
                block_1.start.y_vector = CanvasArray[0].start.y_vector;
            }
    })
    //checks that each friction zone will appear within limits of canvas
    FrictionSquareArray.forEach((friction_1) => {
        if (friction_1.start.x_vector<CanvasArray[0].start.x_vector || 
            friction_1.start.x_vector+friction_1.length.x_vector 
            > (CanvasArray[0].start.x_vector+CanvasArray[0].length.x_vector)){
                //ensures that if friction zone's length is greater than canvas's it will be reduced to fit
                if (friction_1.length.x_vector>CanvasArray[0].length.x_vector){
                    friction_1.length.x_vector = CanvasArray[0].length.x_vector;
                } 
                friction_1.start.x_vector = CanvasArray[0].start.x_vector;
            }
        if (friction_1.start.y_vector<CanvasArray[0].start.y_vector || 
            friction_1.start.y_vector+friction_1.length.y_vector 
            > (CanvasArray[0].start.y_vector+CanvasArray[0].length.y_vector)){
                //ensures that if friction zone's height is greater than canvas's it will be reduced to fit
                if (friction_1.length.y_vector>CanvasArray[0].length.y_vector){
                    friction_1.length.y_vector = CanvasArray[0].length.y_vector;
                } 
                friction_1.start.y_vector = CanvasArray[0].start.y_vector;
            }
    })
    //checks that each teleporter will appear within limits of canvas and teleport within limits
    TeleportArray.forEach((teleporter_1)=> {
        if (teleporter_1.start.x_vector<CanvasArray[0].start.x_vector || 
            teleporter_1.start.x_vector+teleporter_1.length.x_vector 
            > (CanvasArray[0].start.x_vector+CanvasArray[0].length.x_vector)){
                //ensures that if teleporter's length is greater than canvas's it will be reduced to fit
                if (teleporter_1.length.x_vector>CanvasArray[0].length.x_vector){
                    teleporter_1.length.x_vector = CanvasArray[0].length.x_vector;
                } else{
                    teleporter_1.start.x_vector = CanvasArray[0].start.x_vector;
                }
            }
        if (teleporter_1.start.y_vector<CanvasArray[0].start.y_vector || 
            teleporter_1.start.y_vector+teleporter_1.length.y_vector 
            > (CanvasArray[0].start.y_vector+CanvasArray[0].length.y_vector)){
                //ensures that if teleporter's height is greater than canvas's it will be reduced to fit
                if (teleporter_1.length.y_vector>CanvasArray[0].length.y_vector){
                    teleporter_1.length.y_vector = CanvasArray[0].length.y_vector;
                } else{
                    teleporter_1.start.y_vector = CanvasArray[0].start.y_vector;
                }
            }
        //ensures that if teleporter would move objects outside of canvas then teleport point is moved to centre of canvas for x or y
        if (teleporter_1.teleportPoint.x_vector<=CanvasArray[0].start.x_vector || teleporter_1.teleportPoint.x_vector 
            >= (CanvasArray[0].start.x_vector+CanvasArray[0].length.x_vector)){
                teleporter_1.teleportPoint.x_vector = (CanvasArray[0].start.x_vector+CanvasArray[0].length.x_vector)/2;
            }
        if (teleporter_1.teleportPoint.y_vector<=CanvasArray[0].start.y_vector || teleporter_1.teleportPoint.y_vector
            >= (CanvasArray[0].start.y_vector+CanvasArray[0].length.y_vector)){
                teleporter_1.teleportPoint.y_vector = (CanvasArray[0].start.y_vector+CanvasArray[0].length.y_vector)/2;
            }
    });
    //if statement to check if there is more than one player ball or 0
    if (PlayerBallArray.length == 0 || PlayerBallArray.length >=2){
        //if there is more than 1 then balls are set as not player and they are removed from the player ball array
        if (PlayerBallArray.length>1){
            PlayerBallArray.forEach((ball_1) => {
                ball_1.player = false;
            });
            PlayerBallArray.splice(0, PlayerBallArray.length);
        }
        //default ball created to act as camera to watch game/simulation
        let PlayerCamera = new Ball(100, 100, 0, 0.00001, 0, 0, 5, 0.1, false, "/", 0, false, true, true, CanvasArray[0].fill, CanvasArray[0].fill);
    }
    //code goes into main loop that will repeat
    requestAnimationFrame(mainLoop);
}

//main set of code that will call the other methods
function mainLoop() {    
    //ensures that the full areas are cleared so that there are not repeat frames on top of each other, even off screen, as
    //this can affect performance
    if (CanvasArray[0].length.x_vector<=width&&CanvasArray[0].length.y_vector<=height){
        ctx.clearRect(CanvasArray[0].start.x_vector, CanvasArray[0].start.y_vector, 
            width, height);
    } else if (CanvasArray[0].length.x_vector<=width&&CanvasArray[0].length.y_vector>height){
        ctx.clearRect(CanvasArray[0].start.x_vector, CanvasArray[0].start.y_vector, 
            width, CanvasArray[0].start.y_vector+CanvasArray[0].length.y_vector);
    } else if (CanvasArray[0].length.x_vector>width&&CanvasArray[0].length.y_vector<=height){
        ctx.clearRect(CanvasArray[0].start.x_vector, CanvasArray[0].start.y_vector, 
            CanvasArray[0].start.x_vector+CanvasArray[0].length.x_vector, height);
    } else {
        ctx.clearRect(CanvasArray[0].start.x_vector, CanvasArray[0].start.y_vector, 
            CanvasArray[0].start.x_vector+CanvasArray[0].length.x_vector, CanvasArray[0].start.x_vector+CanvasArray[0].length.y_vector);
    }
    //checks position of each object against the position of the player ball and then draws them if on screen (see universal
    //to canvas methods)
    universalToCanvasRectangles(PlayerBallArray[0], CanvasArray[0]);
    FrictionSquareArray.forEach((friction_1) => {
        universalToCanvasRectangles(PlayerBallArray[0], friction_1);
    });
    TeleportArray.forEach((teleport_1) => {
        universalToCanvasTeleporters(PlayerBallArray[0], teleport_1);
    })
    MagnetArray.forEach((magnet_1) => {
        universalToCanvasCircles(PlayerBallArray[0], magnet_1);
    });
    BlockArray.forEach((block_1) => {
        universalToCanvasRectangles(PlayerBallArray[0], block_1);
    });
    BallArray.forEach((ball_2) => {
        if (ball_2.player == false){
            universalToCanvasCircles(PlayerBallArray[0], ball_2);
        }
    });
    //draws player ball
    drawCircle(PlayerBallArray[0]);
    //cycles through each ball for their movement and comparisons to other balls
    BallArray.forEach((ball_1, index) => {
        //if statement to ensure only player balls affected by keyboard control
        if (ball_1.player == true){
            playerControl(ball_1);
        }
        //ball checked against each teleporter
        TeleportArray.forEach(teleport_1 =>{
            checkTeleport(ball_1, teleport_1);
        })
        //if statement so that last ball isn't chosen as this affects logic of for loop
        if (index !== BallArray.length-1){
            //for loop to cycle through and compare each ball to the balls further on in the list, ensuring each ball
            //only checked against each other once
            for(let num = index+1; num<BallArray.length; num++){
                //if statement to check neither ball is a ghost before comparing them in methods
                if (ball_1.ghost == false && BallArray[num].ghost == false){
                    //methods used to check balls against each other
                    checkCollision(ball_1, BallArray[num]);
                    ballVectors(ball_1, BallArray[num]);
                    //if statement to ensure both balls are magnetic before calling method
                    if (ball_1.magnetic == true && BallArray[num].magnetic == true){
                        checkMagneticBalls(ball_1, BallArray[num]);
                    } 
                }
            }
            //checks ball isn't stationary before checking movement based methods on them
            if (ball_1.stationary == false){
                functionGroup(ball_1);
            }
        } 
        //used for checking the last ball against other objects (other than balls since it has been compared to the rest already)
        else {
            //if statement to check if the last ball is player controlled
            if (ball_1.player == true){
                playerControl(ball_1);
            }
            //if statement to check if last ball is stationary or not to go through with the function group method
            if (ball_1.stationary == false){
                functionGroup(ball_1);
            }
        }
    });
    //request animation frame will keep requesting this loop to ensure main loop keeps occurring  
    requestAnimationFrame(mainLoop);
}
//method and classes exported for the programmer to use in another javascript file
export { initiate, FrictionZone, Ball, Magnet, Block, Canvas, Teleporter};