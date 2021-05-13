
var bg, backgroundImg,ground;
var ironman, stones, stoneImg;
var diamondImage, diamondsGroup, diamondsScore=0, diamondSound;
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
 ironmanImg= loadImage("images/iron.png");
 stoneImg= loadImage("images/stone.png");
 diamondImage= loadImage("images/diamond.png");
 diamondSound= loadSound("sounds/coinSound.mp3")
}

function setup() {
createCanvas(1000, 600);
bg = createSprite(580,300);
 ironman=createSprite(185,525,20,20);
 ironman.scale=0.3;
 ironman.addImage(ironmanImg);
 ground=createSprite(200,585,1500,100);
 ground.visible=false;
 bg.velocityY= 6;
 bg.addImage(backgroundImg);
 bg.scale =1.5;
 stonesGroup = new Group();
 diamondsGroup= new Group();
 ironman.debug=true;
}

function draw() {

  if (bg.y >550){
    bg.y = bg.height/4;
   }
   if (ironman.y< 100){
     ironman.y=100;
   }
   if (ironman.x< 100){
    ironman.x=100;
  }

  
   if(keyDown("up")){
     ironman.velocityY= -10
   };
   if(keyDown("left")){
    ironman.velocityX= -8
  };
  if(keyDown("right")){
    ironman.velocityX= 8
  }
  if(keyDown("down")){
    ironman.velocityY=16
  }
  if(keyDown("space")){
    ironman.velocityY=0;
    ironman.velocityX=0;
  }
  ironman.velocityY+= 0.5;

ironman.collide(ground);
generateStones ();
generateDiamonds ();
for (var i=0; i< (stonesGroup).length ; i++){
  var temp =(stonesGroup).get(i);
  if(temp.isTouching(ironman)){
    ironman.collide(temp)
  }
}

for( var j=0; j<(diamondsGroup).length; j++){
  var temp2= (diamondsGroup).get(j);
  if (temp2.isTouching(ironman)){
    diamondSound.play();
    diamondsScore++;
    temp2.destroy();
    temp2=null;

  }
}
 
    drawSprites();
    textSize(20);
    fill("white");
    text(" Diamonds Collected:   " + diamondsScore ,500,50)
   
}

function generateStones(){
  if (frameCount%50===0){
    var stone= createSprite(1200,120,40,10);
    stone.x=random(50,450);
    stone.addImage(stoneImg);
    stone.scale=0.5;
    stone.velocityY= 5;
    stone.lifetime=250;
    stonesGroup.add(stone);
  }}
function generateDiamonds(){
  if (frameCount%50===0){
    var diamond2= createSprite(1200,120,40,10);
    diamond2.x= Math.round(random(80,350));
    diamond2.addImage(diamondImage);
    diamond2.scale=0.3;
    diamond2.velocityY= 6;
    diamond2.lifetime=2000;
    diamondsGroup.add(diamond2);
  }
}