class Navio{
    constructor(x,y,w,h,naviopos,navioanimation){
        this.body = Bodies.rectangle(x,y,w,h);
        this.w = w;
        this.h = h;
        this.image = loadImage("./assets/boat.png");
        this.naviopos = naviopos;
        this.animation = navioanimation;
        this.speed = 0.05;
        this.isBroken = false;
        World.add(world,this.body);
    }

    animate(){
        this.speed = this.speed+0.03;
    }

    
    remove(index){
        this.animation = navioquebradoanm;
        this.speed = 0.03;
        this.w = 300;
        this.h = 300;
        this.isBroken = true;
        setTimeout(()=>{
            Matter.World.remove(world,this.body);
            delete navios[index];
        },2000);
    }
    display(){
        var angle = this.body.angle;
        var pos = this.body.position;
        var index = floor(this.speed%this.animation.length);
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index],0,this.naviopos,this.w,this.h);
        pop();
    }
}