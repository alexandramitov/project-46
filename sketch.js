var bucket, bucketImg;
var coin, coinImg;
var leaf, leafImg;
var PLAY = 1;
var END = 0;
var gameState = 1;
var score = 0;
var coinTouch;


function preload(){
  bucketImg = loadImage("bucket-removebg-preview.png");
  coinImg = loadImage("coin.png");
  leafImg = loadImage("leaf.png");
  coinTouch = loadSound("323703__reitanna__funny-yay.mp3");
}

function setup() {
  createCanvas(800,700);

  bucket = createSprite(400, 600, 50, 50);
  bucket.addImage(bucketImg);
  bucket.scale = 0.6;
  


  coinGroup = createGroup();
  obstacleGroup = createGroup();


}

function draw() {
  background("pink");  

  edges = createEdgeSprites();
  

  if(gameState === PLAY){

    coins();
    obstacles();


    if(keyDown("RIGHT_ARROW")){
      bucket.velocityX = 5;
    }

    if(keyWentUp("RIGHT_ARROW")){
      bucket.velocityX = 0;
    }

    if(keyDown("LEFT_ARROW")){
      bucket.velocityX = -5;
    }

    if(keyWentUp("LEFT_ARROW")){
      bucket.velocityX = 0;
    }

    if(coinGroup.isTouching(bucket)){
      score = score +2;
      coinGroup.destroyEach();
      coinTouch.play();
    }
    
    textSize(25);
    text("Score= " + score, 30,200);


    if(obstacleGroup.isTouching(bucket)){
      gameState = END;
    }

    if(bucket.collide(edges[0])){
      gameState = END;
    }

    if(bucket.collide(edges[1])){
      gameState = END;
    }

    if(score === 100){
      fill("green");
      text("WOW! You're a Champ", 250,350);
      coinGroup.destroyEach();
      obstacleGroup.destroyEach();

    }
  }

  else{

    if(gameState === END){
      textSize(45);
      fill("black");
        text("GAME OVER", 300,200);

        coinGroup.destroyEach();
        obstacleGroup.destroyEach();

        bucket.velocityX = 0;
      
        
      

    }
  }







  drawSprites();
}

function coins(){
  var coin = createSprite(-100,200,10,10);
  coin.addImage(coinImg);
  coin.scale = 0.2;

  if(frameCount % 50 === 0){
    coin.x = Math.round(random(100,700));
    coin.velocityY = 6;
  }

coinGroup.add(coin);
}

function obstacles(){
  var leaf = createSprite(-100,200,10,10);
  leaf.addImage(leafImg);
  leaf.scale = 0.2;

  if(frameCount % 60 === 0){
    leaf.x = Math.round(random(100,700));
    leaf.velocityY = 8;
  }
  obstacleGroup.add(leaf);
}