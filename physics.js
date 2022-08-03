import { ctx, width, height } from './engineConfig.js';
console.log(width, height);
const BallArray = [];

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
    constructor(xpoint, ypoint, radius, mass, outline, fill){
        this.centre = new Vector(xpoint, ypoint);
        this.radius = radius;
        this.mass = mass;
        this.velocity = new Vector(0,0);
        this.acceleration = new Vector(0,0);
        BallArray.push(this);
        this.outline = outline;
        this.fill = fill;
    }

    drawBall(){
        ctx.beginPath();
        ctx.arc(this.centre.x_vector, this.centre.y_vector, this.radius, 0, 2*Math.PI);
        ctx.strokeStyle = this.outline;
        ctx.stroke();
        ctx.fillStyle = this.fill;
        ctx.fill();
        ctx.closePath();
    }

    //displaying the current acceleration and the velocity of the ball
    display(){
        ctx.beginPath();
        ctx.moveTo(this.centre.x_vector, this.centre.y_vector);
        ctx.lineTo(this.centre.x_vector + this.acceleration.x_vector*100, this.centre.y_vector + this.acceleration.y_vector*100);
        ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(this.centre.x_vector, this.centre.y_vector);
        ctx.lineTo(this.centre.x_vector + this.velocity.x_vector*10, this.centre.y_vector + this.velocity.y_vector*10);
        ctx.strokeStyle = "blue";
        ctx.stroke();
        ctx.closePath();
    }
}

let friction = 0.002;
function BallVectors1(ball_1){
    ball_1.velocity.x_vector += ball_1.acceleration.x_vector;
    ball_1.velocity.y_vector += ball_1.acceleration.y_vector;
    ball_1.centre.x_vector += ball_1.velocity.x_vector;
    ball_1.centre.y_vector += ball_1.velocity.y_vector;
    if (ball_1.centre.x_vector <= ball_1.radius || ball_1.centre.x_vector >= (width-ball_1.radius)){
        if (ball_1.centre.x_vector<=ball_1.radius){
            ball_1.centre.x_vector = ball_1.radius;
        } else if (ball_1.centre.x_vector >= (width-ball_1.radius)){
            ball_1.centre.x_vector = width - ball_1.radius;
        }
        ball_1.velocity.x_vector = -1 * ball_1.velocity.x_vector;
    }
    if (ball_1.centre.y_vector <= ball_1.radius || ball_1.centre.y_vector >= (height-ball_1.radius)){
        if (ball_1.centre.y_vector<=ball_1.radius){
            ball_1.centre.y_vector = ball_1.radius;
        } else if (ball_1.centre.y_vector >= (height-ball_1.radius)){
            ball_1.centre.y_vector = height - ball_1.radius;
        }
        ball_1.velocity.y_vector = ball_1.velocity.y_vector * -1;
    }
    ball_1.velocity.x_vector *= 1 - friction;
    ball_1.velocity.y_vector *= 1 - friction;
}
function BallVectors2(ball_1, ball_2){
    //acceleration values added to the velocity components
    ball_1.velocity.x_vector += ball_1.acceleration.x_vector;
    ball_1.velocity.y_vector += ball_1.acceleration.y_vector;
    if (ball_1.centre.x_vector <= ball_1.radius || ball_1.centre.x_vector >= (width-ball_1.radius)){
        if (ball_1.centre.x_vector<=ball_1.radius){
            ball_1.centre.x_vector = ball_1.radius;
        } else if (ball_1.centre.x_vector >= (width-ball_1.radius)){
            ball_1.centre.x_vector = width - ball_1.radius;
        }
        ball_1.velocity.x_vector = -1 * ball_1.velocity.x_vector;
    }
    if (ball_1.centre.y_vector <= ball_1.radius || ball_1.centre.y_vector >= (height-ball_1.radius)){
        if (ball_1.centre.y_vector<=ball_1.radius){
            ball_1.centre.y_vector = ball_1.radius;
        } else if (ball_1.centre.y_vector >= (height-ball_1.radius)){
            ball_1.centre.y_vector = height - ball_1.radius;
        }
        ball_1.velocity.y_vector = ball_1.velocity.y_vector * -1;
    }
    ball_1.momentum = ball_1.mass*ball_1.velocity.magnitude();
    //velocity gets multiplied by a number between 0 and 1
    //ball_1.vel_x *= 1-friction;
    //ball_1.vel_y *= 1-friction;
    //velocity values added to the current x, y position
    ball_1.centre.x_vector += ball_1.velocity.x_vector;
    ball_1.centre.y_vector += ball_1.velocity.y_vector;
            //distance between two centres in x and y directions
            let distance_x = ball_1.centre.x_vector-ball_2.centre.x_vector;
            let distance_y = ball_1.centre.y_vector-ball_2.centre.y_vector;
            //magnitude of distance to give a scalar number distance between two centres
            let distance_magnitude = Math.sqrt(distance_x**2+distance_y**2);
            if (ball_1.radius+ball_2.radius>=distance_magnitude){
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
                    ball_1.centre.x_vector += move_x;
                    ball_1.centre.y_vector += move_y;
                    ball_2.centre.x_vector -= move_x;
                    ball_2.centre.y_vector -= move_y;
                }
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
                ball_1.velocity.x_vector = newBall1NormalVectorVelocity.x_vector+newBall1TangentVectorVelocity.x_vector;
                ball_1.velocity.y_vector = newBall1NormalVectorVelocity.y_vector+newBall1TangentVectorVelocity.y_vector;
                ball_2.velocity.x_vector = newBall2NormalVectorVelocity.x_vector+newBall2TangentVectorVelocity.x_vector;
                ball_2.velocity.y_vector = newBall2NormalVectorVelocity.y_vector+newBall2TangentVectorVelocity.y_vector;
            };
    ball_1.velocity.x_vector *= 1 - friction;
    ball_1.velocity.y_vector *= 1 - friction;
}



function mainLoop() {
    ctx.clearRect(0, 0, width, height);
    BallArray.forEach((ball_1, index) => {
        console.log(ball_1.velocity.x_vector)
        ball_1.drawBall();
        if (index !== BallArray.length-1){
            for(let num = index+1; num<BallArray.length; num++){
                BallVectors2(BallArray[index], BallArray[num]);
            }
        } else {
            BallVectors1(ball_1);
        }
        
        
        ball_1.display();
    });
    requestAnimationFrame(mainLoop);
}
export { mainLoop, Ball};