class CannonBall{
    constructor(x,y){
        var options = {
            isStatic: true
        }
        this.r = 30;
        this.body = Bodies.circle(x,y,this.r,options);
        this.image = loadImage("./assets/cannonball.png");
        this.trajetoria = [];
        World.add(world,this.body);
    }
    shoot(){
        var newangle = cannon.angle - 28;
        newangle = newangle*(3.14/180);
        var velocidade = p5.Vector.fromAngle(newangle);
        velocidade.mult(0.5);
        Matter.Body.setStatic(this.body,false);
        Matter.Body.setVelocity(this.body,{
            x: velocidade.x*(180/3.14),
            y: velocidade.y*(180/3.14)
        });
    }


    display(){
       var pos = this.body.position;
       push()
       imageMode(CENTER);
       image(this.image,pos.x,pos.y,this.r,this.r); 
       pop();
       
       if (this.body.velocity.x>0 &&pos.x>10){
           var position = [pos.x,pos.y];
           this.trajetoria.push(position);
       }
       for (var i = 0;i<this.trajetoria.length;i++){
        image(this.image,this.trajetoria[i][0],this.trajetoria[i][1],5,5);
       }
    }
}