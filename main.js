const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(myField){
    this._field = myField;
  }
  
  get field(){
    return this._field;
  }
  
  //method that prints the field
  print(){
    var row='';
    for (let i=0; i < height; i++){
      for (let j=0; j< width; j++){
        row +=this._field[i][j];
      }
      console.log(row);
      row='';
    }
  }
  
  //method to change to character to the path character
  changeCharacter(x, y){
    this._field[y][x] = pathCharacter;
  }
  
  //method to generate a new field, given a height and width
  static generateField(height, width){
    this._field = [];
    for (let i=0; i < height; i++){
      this._field.push([]);
      for (let j=0; j < width; j++){
        this._field[i].push([]);
      }
    }
    
    var randomX = 0;
    function generateRandomX(){
      randomX = Math.floor(Math.random() * (width-1));
    }
    
    var randomY = 0;
    function generateRandomY(){
      randomY = Math.floor(Math.random() * (height - 1));
    }
    //generates the starting player point
    this._field[0][0] = '*';
    
    //generate the hat
    var hatGenerated = 0;
    generateRandomX();
    generateRandomY();
    
    while(hatGenerated  < 1){
        //check to see if there is already something in that spot
        if(this._field[randomY][randomX] === '*'){
          generateRandomX();
          generateRandomY();
        }else{
          this._field[randomY][randomX] = hat;
          hatGenerated  = 1;
        }   
    }
    
    
    //generates 2 holes
    var numberOfHoles = 0
    while(numberOfHoles < 2){
      generateRandomX();
      generateRandomY();
      if(this._field[randomY][randomX] === '*' || this._field[randomY][randomX] === '^' || this._field[randomY][randomX] === 'O'){
        generateRandomY();
        generateRandomX();
      }else{
        this._field[randomY][randomX] = hole;
        generateRandomY();
        generateRandomX();
        numberOfHoles += 1;
      }
    }
    
    
    //generates the field characters
     for (let i=0; i < height; i++){
      for (let j=0; j < width; j++){
        if(this._field[i][j] === '*' || this._field[i][j] === '^' || this._field[i][j] === 'O'){
          
        }else{
          this._field[i][j] = fieldCharacter;
        }
      }
    }
    return this._field;
  }
  
}

var currentLocation = [0, 0];
var isPlaying = true;

//The play function, take a parameter of a field
function play(newField){
  newField.print();
  userInput(newField);
  if(isPlaying == true){
    userInput(newField);
  }else if (isPlaying = false);{
    const playAgain = prompt('Do you want to play again? y or n?');
    if(playAgain === 'y'){
      reset();
    }else{
      console.log('Thanks for playing');
      isPlaying = null;
    }
  }
}

//user input that asks for direction, updates the current location and calls testLocation
function userInput(newField){
  const direction = prompt('Which way?');
  //if the player moves right
  if (direction === 'r'){
    currentLocation[0] += 1;
    testLocation(newField);
  //if the player moves left
  }else if(direction === 'l'){
    currentLocation[0] -= 1;
    testLocation(newField);
  //if the player moves up
  }else if(direction === 'u'){
    currentLocation[1] -= 1;
    testLocation(newField);
  //if the player moves down
  }else if(direction === 'd'){
    currentLocation[1] += 1;
    testLocation(newField);
  //if the player doesn't select a direction
  }else{
    console.log("That is not a valid input, please select 'l', 'r', 'u', 'd'");
    const direction = prompt('Which way?');
  }
}

//testLocation function to see if the user has won/lost or whether to change the character
function testLocation(newField){
  var x = currentLocation[0];
  var y = currentLocation[1];
  var field = newField.field;
  if (y < 0 || y > height){
    console.log('That is outside the field, you loose (');
    isPlaying = false;
  }else if (x < 0 || x > width){
    console.log('That is outside the field, you loose (');
    isPlaying = false;
  }else if(field[y][x] === hat){
    console.log('Congratulations you found the hat!');
    isPlaying = false;
  }else if (field[y][x] === hole){
    console.log('You have fallen in a hole, you loose :(');
    isPlaying = false;
  }else{
    isPlaying = true;
    newField.changeCharacter(x, y);
    play(newField);
  }
}

//reset function for a new game
function reset(){
  isPlaying = true;
  currentLocation = [0, 0];
  height = prompt ('What height would you like the field?');
  width = prompt ('What width would you like the field?');
  var myField = new Field(Field.generateField(height, width));
  play(myField);
}

//Initial method call
var height = prompt ('What height would you like the field?');
var width = prompt ('What width would you like the field?');
var myField = new Field(Field.generateField(height, width));
play(myField);