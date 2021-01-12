var reset;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup, ground;
var score = 0;
var PLAY = "PLAY";
var END = "END";
var playState = "PLAY";
function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}
function setup() { 
  createCanvas(600, 400);
  obstacleGroup = new Group();
  monkey = createSprite(50, 340, 20, 20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.125;
  ground = createSprite(300, 380, 600, 10);
  FoodGroup = new Group();
  reset = createSprite(100, 200, 80, 80);
  reset.visible = false;
}
function draw() {
  background(235);
  textSize(20);
  text("Score: " + score, 20, 15);
  if(playState === PLAY){
    reset.visible = false;
    bananas();
    enemies();
    if(keyDown("space") && monkey.y > 200){
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score = score + 1;
    }
    
    if(monkey.isTouching(obstacleGroup)){
      playState = END;
    }
    
  }
  else if(playState === END){
    reset.visible = true;
    
    text("game over", 200, 200)
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    if(mousePressedOver(reset)){
      playState = PLAY;
      score = 0;
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
    }
  }
  drawSprites();
  monkey.collide(ground);
}
function bananas(){
  if(frameCount % 80 === 0){
    banana = createSprite(700, 200, 10, 10);
  banana.addAnimation("banana", bananaImage);
  banana.y = Math.round(random(20, 300));
  banana.scale = 0.125;
  banana.velocityX = -7;
    FoodGroup.add(banana);
    banana.lifetime = 200;
  }
}
function enemies(){
  if(frameCount % 200 === 0){
    obstacle = createSprite(380, 330, 20, 20);
    obstacle.addAnimation("obstacle", obstaceImage)
    obstacle.velocityX = -8;
    obstacle.scale = 0.25;
    obstacle.lifetime = 180;
    obstacleGroup.add(obstacle);
  }
}