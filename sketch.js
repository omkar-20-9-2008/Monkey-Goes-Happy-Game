
var monkey , monkey_running
var banana,bananaImage,obstacle, obstacleImage,down
var FoodGroup, obstacleGroup
var score
var invisibleground,retry,retryImg
var play=1
var end=0
var gamestate = play
var survivalTime=0
var bananas=0

function preload(){
  
down = loadImage("sprite_0.png")  
  monkey_running =            loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  retryImg = loadImage("retry.png")
 
}



function setup() {
  createCanvas(600,400);
monkey = createSprite(100,290,10,10);  
monkey.addAnimation("monkey",monkey_running);
monkey.scale=0.2;
  
  retry = createSprite(500,80,10,10)
  retry.addImage("retry",retryImg)
  retry.scale=0.1
  retry.visible=false;

  ground = createSprite(300,350,1200,10);
  ground.x=ground.width/2;
ground.velocityX=-4;

  
invisibleground = createSprite(300,355,1000,10);
  invisibleground.visible=false;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  againGroup = createGroup();
  

  
}


function draw() {
background(500);
 
  
  stroke(rgb(0,0,204))
  fill(rgb(0,0,204))
  textSize(20)
  text("bananas: "+bananas,20,50)
  
  stroke("black")
  textSize(20);
  fill("black");
  text("Survival Time: "+ survivalTime,400,50)
 
  
  if(gamestate===play){
  
 monkey.collide(invisibleground);

     survivalTime=Math.round(frameCount)

 
    food();
    stone();

 if (ground.x<0){
 ground.x=ground.width/2;
 } 
  
 if(keyDown("space")&&monkey.y>=280){
 monkey.velocityY=-17;
 }
    
    

  monkey.velocityY = monkey.velocityY+0.8
    obstacleGroup.collide(invisibleground)

    if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    bananas=bananas+1
      
    }
    
    retry.visible=false;
    
if(monkey.isTouching(obstacleGroup)){
gamestate=end
  
}
  
                
  
  
  }else if (gamestate===end){  
 ground.velocityX=0; 
monkey.addAnimation("monkey",down)  
monkey.velocityY=0;
 
 foodGroup.setVelocityXEach(0);
obstacleGroup.setVelocityXEach(0);
 foodGroup.setLifetimeEach(-1);
obstacleGroup.setLifetimeEach(-1);
ground.velocityX=0
     fill(rgb(0,204,0))
    textSize(50)
    text("GAME OVER",150,100)
    retry.visible=true;
    if(mousePressedOver(retry)){
  reset();
    }
  
  }
  
 drawSprites();
}

function reset(){
gamestate=play
frameCount=0
bananas=0
foodGroup.destroyEach();
obstacleGroup.destroyEach();
monkey.addAnimation("monkey",monkey_running)
  
  survivalTime = 0;

}

function food(){
 if(frameCount%80===0) {
banana = createSprite(610,Math.round(random(120,200)),10,10);  

banana.addImage("banana",bananaImage);
banana.scale = 0.15;
   banana.velocityX=-5;
   banana.setLifetime=123;
   
   foodGroup.add(banana);
 
 }
}

function stone(){
if (frameCount%300===0){
obstacle = createSprite(678,250,10,10);
obstacle.addImage("obstacle",obstacleImage);
obstacle.scale=0.2;
  obstacle.velocityY=30;
obstacle.velocityX=-9;
obstacle.setLifetime=100;  
obstacle.collide(invisibleground);  
  obstacle.setCollider("rectangle",-30,0,450,400);
obstacleGroup.add(obstacle);

}

}