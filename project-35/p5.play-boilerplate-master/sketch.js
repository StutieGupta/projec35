var balloon, balloon1;
var bg,database,position

function preload(){

  balloon1 = loadImage("balloon.png");
  bg = loadImage("background.png")
}


function setup() {
  database = firebase.database();
  console.log(database);

  createCanvas(1500,600);
  balloon = createSprite(800, 200, 50, 50);
  balloon.addImage(balloon1)

  var balloonposition = database.ref('balloon/position');
  balloonposition.on("value", readPosition, showError);
}

function draw() {
  background(bg); 
  
  if(keyDown(UP_ARROW)){
    writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,1);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }
  else if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }

  stroke(4);
  textSize(15)
  text("USE ARROW KEYS TO MOVE THE BALLOON.....HAPPY JOURNEY!!!", 50,50)
  
  drawSprites();
}


function changePosition(x,y){
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;
}

function readPosition(data){
  position = data.val();
  console.log(position)
  
  balloon.x = position.x;
  balloon.y = position.y;

}

function showError(){
  console.log("show error");
}

function writePosition(x,y){
  database.ref('balloon/position').set({
      'x': position.x + x,
      'y': position.y + y
  })
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}
