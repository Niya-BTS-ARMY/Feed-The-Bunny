const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, fruit, ground;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink, eat, sad;

var cut_sound, air, balloon, eat_sound, bgsound, sad_sound;
var mute_btn;

var button1,button2;
var rope1,rope2,con1,con2;


function preload() {
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  blink.looping = true
  sad.looping = false;
  eat.looping = false;

  cut_sound = loadSound("rope_cut.mp3");
  air = loadSound("air.wav")
  eat_sound = loadSound("eating_sound.mp3");
  bgsound = loadSound("sound1.mp3")
  sad_sound = loadSound("sad.Wav");

}

function setup() {
  
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }

  frameRate(80);

 // bgsound.play();
//bgsound.setVolume(0.5)

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(20, 30);
  button.size(60, 60);
  button.mouseClicked(()=>drop(rope,fruit_con));

  button1=createImg('cut_btn.png');
  button1.position(330,35);
  button1.size(60, 60);
  button1.mouseClicked(()=>drop(rope1,con1));

  button2=createImg('cut_btn.png');
  button2.position(360,200);
  button2.size(60, 60);
  button2.mouseClicked(()=>drop(rope2,con2));

  mute_btn = createImg('mute.png');
  mute_btn.position(450, 20);
  mute_btn.size(50, 50);
  mute_btn.mouseClicked(mute);

  balloon = createImg('balloon.png');
  balloon.position(10, 250);
  balloon.size(150, 100);
  balloon.mouseClicked(airBlower);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(230, canH-100, 100, 100);
  bunny.scale = 0.3;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('crying', sad);
  bunny.changeAnimation('blinking');

  rope = new Rope(8, { x: 40, y: 30 });
  ground = new Ground(200, canH, 600, 20);

  rope1=new Rope(7,{x:370 ,y:40});

  rope2=new Rope(4,{x:400 ,y:225});

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);
  con1=new Link(rope1,fruit);
  con2=new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
 

}

function draw() {
  background(51);
  
  image(bg_img, 0,0,displayWidth+80,displayHeight);

  push()
  imageMode(CENTER);
  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }
  pop()

  rope.show();
  Engine.update(engine);
  ground.show();

  rope1.show();
  rope2.show();

  if (coll(fruit, bunny)) {
    bunny.changeAnimation('eating')
    eat_sound.play();
  }

  if(fruit!=null && fruit.position.y>=height-30)
  {
    bunny.changeAnimation('crying');
    bgsound.stop();
    sad_sound.play();
    fruit=null;
     
   }

  drawSprites();
}

function drop(ropes,cons) {
  ropes.break();
  cons.detach();
  cons = null;
  cut_sound.play();
}


function coll(body1, body2) {

  console.log(body1)
  console.log(body2)
  if (body1 != null) {
    var d = dist(body1.position.x, body1.position.y, body2.position.x, body2.position.y)
    if (d <= 80) {
      World.remove(world, fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }
  }

}

function mute() 
{

  if (bgsound.isPlaying())
  {
    bgsound.stop();
  }
  else {
    bgsound.play();
  }

}

function airBlower(){

Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
air.play();

}






