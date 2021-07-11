var trex, trex_running, trex_collided;
var PLAY=1
var END=0
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var ran
var score = 0
var obstaclesgroup;
var cloudsgroup
var gameState = PLAY
var restartimage, gameoverimage, restart, gameover 
var jump, die, checkpoint 



var newImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  obstacle1 =  loadImage("obstacle1.png")
  obstacle2 =  loadImage("obstacle2.png")
  obstacle3 =  loadImage("obstacle3.png")
  obstacle4 =  loadImage("obstacle4.png")
  obstacle5 =  loadImage("obstacle5.png")
  obstacle6 =  loadImage("obstacle6.png")

  restartimage = loadImage("restart.png");
  gameoverimage = loadImage("gameOver.png");

  jump = loadSound("jump.mp3")
  die = loadSound("die.mp3")
  checkpoint = loadSound("checkpoint.mp3") 
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,180,400,10);
  invisibleGround.visible = false;
  
  console.log("Hello"+ 5)

  obstaclesgroup = new Group()
  cloudsgroup = new Group()

  trex.setCollider("rectangle",0,0,100,60);
  trex.debug = true
  
  restart = createSprite(300,140)
  restart.addImage(restartimage)
  restart.scale = 0.5


  gameover = createSprite(300,100);
  gameover.addImage(gameoverimage);
  gameover.scale = 0.6
}

function draw() {
  background(180);
  text("score "+score,530,40)



  if (gameState===PLAY) {
    ground.velocityX = -(4 + 3*score/100)
    score = score+ Math.round(getFrameRate()/60) 
    
    if(keyDown("space")&&trex.y>=100) {
      trex.velocityY = -10;
      jump.play() 
    }
    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(score % 100===0 && score>0) {
      checkpoint.play()
    }

    spawnClouds();
    spawnObstacles();

    if (obstaclesgroup.isTouching(trex)) {
      gameState=END; 
    }


    restart.visible = false
    gameover.visible = false
  }
  else if (gameState===END) {
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex.addImage(trex_collided);
    obstaclesgroup.setVelocityXEach(0)
    cloudsgroup.setVelocityXEach(0)
    obstaclesgroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1);
    restart.visible = true
    gameover.visible = true
    if(mousePressedOver(restart)) {
       reset() 
    }
  }
  
  

  
  
  
  trex.collide(invisibleGround);
  
  //spawn the clouds
 
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 134
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudsgroup.add(cloud);
    }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    obstacle  = createSprite(600,165,10,40)
    obstacle.velocityX = -(6 + score/100) 
    

    ran = Math.round(random(1,6))

    switch(ran) {
      case 1: obstacle.addImage(obstacle1)
      break
      case 2: obstacle.addImage(obstacle2)
      break
      case 3: obstacle.addImage(obstacle3)
      break
      case 4: obstacle.addImage(obstacle4)
      break
      case 5: obstacle.addImage(obstacle5)
      break
      case 6: obstacle.addImage(obstacle6)
      break

    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    obstaclesgroup.add (obstacle)
  }
}

function reset() {
  score = 0
      gameState = PLAY 
      obstaclesgroup.destroyEach() 
      cloudsgroup.destroyEach()

}

