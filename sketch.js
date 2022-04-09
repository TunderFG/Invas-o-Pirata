
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var ground, tower, backgroundIMG, towerIMG, cannon, a = 20; 
var ball;
var balls = [];
var navio;
var navios = [];
var naviospritedata,naviospritesheet,navioanimation = [];
var navioquebradosprdata,navioquebradosprsheet,navioquebradoanm = [];
var splashdata,splashsheet,splashanimation = [];
var isGameover = false;
var bgSound, waterSound, pirateSound, cannonSound;
var isLaughing = false;
var score = 0;


function preload() {
  backgroundIMG = loadImage("assets/background.gif");
  towerIMG = loadImage("assets/tower.png");
  naviospritedata = loadJSON("assets/boat/boat.json");
  naviospritesheet = loadImage("assets/boat/boat.png");
  navioquebradosprdata = loadJSON("assets/boat/brokenBoat.json");
  navioquebradosprsheet = loadImage("assets/boat/brokenBoat.png");
  splashdata = loadJSON("assets/waterSplash/waterSplash.json");
  splashsheet = loadImage("assets/waterSplash/waterSplash.png");

  bgSound = loadSound("assets/background_music.mp3");
  waterSound = loadSound("assets/cannon_water.mp3");
  pirateSound = loadSound("assets/pirate_laugh.mp3");
  cannonSound = loadSound("assets/cannon_explosion.mp3");
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

  //Carregar Animações
  var naviosframes = naviospritedata.frames;

  for(var i = 0;i<naviosframes.length;i++){
    var pos = naviosframes[i].position;
    var img = naviospritesheet.get(pos.x,pos.y,pos.w,pos.h);
    navioanimation.push(img);
  }
  var navioquebradoframes = navioquebradosprdata.frames;

  for(var i = 0;i<navioquebradoframes.length;i++){
    var pos = navioquebradoframes[i].position;
    var img = navioquebradosprsheet.get(pos.x,pos.y,pos.w,pos.h);
    navioquebradoanm.push(img);
  }

  var splashframes = splashdata.frames;

  for(var i = 0;i<splashframes.length;i++){
    var pos = splashframes[i].position;
    var img = splashsheet.get(pos.x,pos.y,pos.w,pos.h);
    splashanimation.push(img);
  }


  
}

function draw() {
  image(backgroundIMG,0,0,width,height);
  if(!bgSound.isPlaying()){
    bgSound.play();
    bgSound.setVolume(0.1);
  }
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
    collisionBoat(i);
  }
  fill("#6d4c41");
  textSize(40);
  text("Score:"+score,width-200,50);
  textAlign(CENTER,CENTER);
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
    ball.animate();
   if (ball.body.position.x>=width||ball.body.position.y>=height-50){
     if(!ball.isSink){
       waterSound.play()
       waterSound.setVolume(0.1)
       ball.remove(index);
     }
   } 
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW){
    cannonSound.play();
    cannonSound.setVolume(0.1);
    balls[balls.length-1].shoot();
  }
}

function showNavios() {
  if (navios.length>0){
    if (navios[navios.length-1] === undefined || navios[navios.length-1].body.position.x<width-300){
      var posicoes = [-40,-60,-70,-20];
      var pos = random(posicoes);
      var navio = new Navio(width,height-100,170,170,pos,navioanimation);
      navios.push(navio);
    }
    for(var i = 0;i<navios.length;i++){
      if(navios[i]){ 
      Matter.Body.setVelocity(navios[i].body,{
        x: -0.9,
        y: 0
      });
      navios[i].display();
      navios[i].animate();
      var collision = Matter.SAT.collides(tower,navios[i].body);
      if(collision.collided && !navios[i].isBroken){
        if(!isLaughing && !pirateSound.isPlaying()){
          pirateSound.play();
          isLaughing = true;
        }
        isGameover = true;
        gameover();
      }
     }
    }
  }
  else{
    var navio = new Navio(width,height-60,170,170,-60,navioanimation);
    navios.push(navio);

  }
}

function collisionBoat(index) {
  for (var i = 0;i<navios.length;i++){
    if(balls[index]!== undefined && navios[i]!== undefined){
      var collision = Matter.SAT.collides(balls[index].body,navios[i].body);
      if(collision.collided){
        if(!navios[i].isBroken && !balls[index].isSink){
          score = score+5;
          navios[i].remove(i);
        }
        Matter.World.remove(world,balls[index].body);
        delete balls[index]
      }
    }
  }
}


function gameover() {
  swal({
    title:`Game Over!`,
    text:'Obrigado por jogar.',
    imageUrl:'https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png',
    imageSize:'150x150',
    confirmButtonText:'Jogar Novamente'
  },
  function (isConfirm){
    if(isConfirm){
      location.reload();
    }
  })
}

