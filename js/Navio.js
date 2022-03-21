class Navio{
    constructor(x,y,w,h,naviopos){
        this.body = Bodies.rectangle(x,y,w,h);
        this.w = w;
        this.h = h;
        this.image = loadImage("./assets/boat.png");
        this.naviopos = naviopos;
        World.add(world,this.body);
    }
    display(){
        var angle = this.body.angle;
        var pos = this.body.position;
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,this.naviopos,this.w,this.h);
        pop();
    }
}