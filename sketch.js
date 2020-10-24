var play = 1;
var end = 0;
var gameState = play;
var ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime; 

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
  
  monkey = createSprite(50,550,25,25);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.2;
  
 ground  = createSprite(400,590,900,10);
 ground.velocityX=-4;

  FoodGroup = new Group();
  obstacleGroup = new Group ();
  
  survivalTime = 0;
  score = 0;
}


function draw() {
  background (220)
  
 
  if(obstacleGroup.collide(monkey)){
    gameState = end
  }
  
  if(gameState === play){
    monkey.collide(ground);
  
  if(keyDown("space")){
    monkey.velocityY = -12
  }
  
  // add gravity
  monkey.velocityY = monkey.velocityY+0.8;
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : " + score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time : " + survivalTime,100,50);
  
    
    
  }
  if(gameState ===  end ){
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    monkey.destroy();
    
    score = 0;
    survivalTime = 0;
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    obstacleGroup.setLifetimeEach (-2);
    FoodGroup.setLifetimeEach (-2);
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
  stroke("black");
  textSize(20);
  fill("black");
  text("Game Over " ,280,300);
  }
  if(frameCount % 80 === 0){
    
    var banana = createSprite(300,350,25,25);
    banana.y = Math.round(random(300,350));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 50;
    FoodGroup.add(banana);
  
  }
  
  if(frameCount % 300 === 0){
    var stone = createSprite(250,590,25,25);
    stone.x = Math.round(random(300,400));
    stone.addImage(obstacleImage);
    stone.scale = 0.5;
    stone.velocityX = -5;
    stone.lifetime = 50;
    obstacleGroup.add(stone);
  }

  ground.x=ground.width/2;
  console.log(ground.x);
  drawSprites();
}






