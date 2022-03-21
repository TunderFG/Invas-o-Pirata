
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var ground, tower, backgroundIMG, towerIMG, cannon, a = 20; 
var ball;
var balls = [];
var navio;
var navios = [];



function preload() {
  backgroundIMG = loadImage("assets/background.gif");
  towerIMG = loadImage("assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0,height-1,width*2,1,options);
  World.add(world,ground);

  tower = Bodies.rectangle(160,350,160,310,options);
  World.add(world,tower);

  angleMode(DEGREES);
  a = 15

  cannon = new Cannon(180,110,130,100,a);

  
}

function draw() {
  image(backgroundIMG,0,0,width,height);
  Engine.update(engine);

  rect(ground.position.x,ground.position.y,width*2,1);

  push();
  imageMode(CENTER);
  image(towerIMG,tower.position.x,tower.position.y,160,310);
  pop();

  cannon.display();
  showNavios();


  for(var i = 0;i<balls.length;i++){
    showBalls(balls[i],i);
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW){
    var ball = new CannonBall(cannon.x,cannon.y);
    ball.trajetoria = [];
    Matter.Body.setAngle(ball.body,cannon.angle);
    balls.push(ball);
  }
}

function showBalls(ball,index) {
  if (ball){
    ball.display();
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW){
    balls[balls.length-1].shoot();
  }
}

function showNavios() {
  if (navios.length>0){
    if (navios[navios.length-1] === undefined || navios[navios.length-1].body.position.x<width-300){
      var posicoes = [-40,-60,-70,-20];
      var pos = random(posicoes);
      var navio = new Navio(width,height-100,170,170,pos);
      navios.push(navio);
    }
    for(var i = 0;i<navios.length;i++){
      if(navios[i]){ 
      Matter.Body.setVelocity(navios[i].body,{
        x: -0.9,
        y: 0
      });
      navios[i].display();
     }
    }
  }
  else{
    var navio = new Navio(width,height-60,170,170,-60);
    navios.push(navio);

  }
}