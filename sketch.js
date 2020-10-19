var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var bananagroup, obstaclegroup;
var score;
var ground, invisibleground;
var gamestate,PLAY,END;
var obstaclegroup,bananagroup;
function preload() { 
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}
function setup() {
  createCanvas(600,400);
  monkey = createSprite(60,315,10,10);
  monkey.scale = 0.2
  monkey.addAnimation("running",monkey_running);
  ground = createSprite(300,380,700,10);
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;
  PLAY = 1;
  END = 0;
  gamestate = PLAY;
  score = 1;
  obstaclegroup = createGroup();
  bananagroup = createGroup();
}


function draw() {
 background("white");
  monkey.collide(ground);
  //  console.log(gamestate);
  if (gamestate === 1) {
      if (keyDown("space") && monkey.y >= 313) {
        monkey.velocityY = -15;
    }
    //move the ground 
    ground.velocityX = -(4 + 3 * score / 180);
    //scoring
    score = score + Math.round(getFrameRate() / 60);
    monkey.velocityY = monkey.velocityY + 0.7;   
     if (ground.x < 300) {
    ground.x = ground.width / 2;  
  }
    spawn();
    bananagroup.lifetime = 51;
    obstaclegroup.lifetime = 51;
    if(monkey.isTouching(obstaclegroup)){
     gamestate = 0; 
    }
    if(monkey.isTouching(bananagroup)){
      bananagroup.destroyEach();
    }
  }else if (gamestate === 0) {
    ground.velocityX = 0;
    monkey.velocity = 0;
    bananagroup.lifetime =0;
    obstaclegroup.lifetime = 0;
    bananagroup.velocityX = 0;
    obstaclegroup.velocityY = 0;
  }
  text("survivaltime: " + score, 400,50);
  drawSprites();
}    
function spawn(){
  if(frameCount%80 === 0){
  banana = createSprite(600,Math.round(random(90,200)),10,10);
    banana.velocityX = -12;
    banana.scale = 0.1;
    banana.addImage(bananaImage);   
    bananagroup.add(banana);
  }
  if(frameCount%300 === 0 ){
   obstacle = createSprite(600,325,10,10);
   obstacle.velocityX = -12;
   obstacle.addImage(obstaceImage);
   obstacle.scale = 0.3;
   obstaclegroup.add(obstacle) 
  } 
}
