var PLAY = 1;
var END = 0;
var gameState = "play"

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var count=0;

function preload(){
  hero_running = loadAnimation("hero2 (1).png","hero2 (2).png","hero2 (3).png","hero2 (4).png","hero2 (5).png");
  
  
  background2 = loadImage("background1.png");
  
  

  obstacle3 = loadImage("spikes2.png");
  obstacle4 = loadImage("pixilart1.png");

  obstacle5 = loadAnimation("credits.png","credits 2.png","credits 3.png","credits 4.png","credits 5.png","credits 6.png","credits 7.png");
   obstacle6 = loadImage("spinach1.png");
  
}

function setup() {
  createCanvas(1400,600);
  

  
  background1 = createSprite(800,100,900,900);
  background1.addImage("background",background2);
  background1.x = background1.width /2;
  background1.scale=1.5
  hero = createSprite(100,480,20,20);
  hero.addAnimation("running", hero_running);
  hero.scale = 0.5;
  ground=createSprite(100,520,200,3)
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
   creditsGroup = createGroup();
  score = 0;
  hero.setCollider("circle",0,0,50);
  ground.visible=false
}

function draw() {
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  if(gameState=="play"){
    
    if(hero.isTouching(creditsGroup)){
      score=score+1
      creditsGroup.destroyEach()
    }
  
  if(background1.x<0){
    background1.x=600

  }
background1.velocityX=-8
  if(keyDown("Space") && hero.y<600){
    hero.velocityY=hero.velocityY-1
  }

  if(obstaclesGroup.isTouching(hero)){
    
    gameState="END"
  }
  hero.velocityY=hero.velocityY+0.5
  hero.collide(ground)

    spawnObstacles();
     credits()
  drawSprites();

}
  if(gameState=="END"){
    gameOver()

  }
}

function spawnObstacles(){
 if (frameCount % 70 === 0){
   var obstacle = createSprite(1200,500,10,40);
   obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(3,4));
    switch(rand) {
      
     
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
     
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function credits() {
  if (frameCount % 65 === 0){
    var obstacle = createSprite(1400,400,20,50);
    obstacle.velocityX = -6;
    
     //generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: obstacle.addAnimation("coins",obstacle5);
               break;
       case 2: obstacle.addImage(obstacle6);
               break;
      
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.5;
     obstacle.lifetime = 300;
    
    //add each obstacle to the group
     creditsGroup.add(obstacle);
  }  
}
 
function gameOver(){
  ground.velocityX=0
  ground.velocityY=0
  textSize(100)
     text("GameOver",400,300);
}