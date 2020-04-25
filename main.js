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
  
  print(){
    var row1 ='';
    for (let i=0; i < this._field[0].length; i++){
      row1 += (this._field[0][i]);
    }
    var row2='';
    for (let i=0; i < this._field[1].length; i++){
      row2 += (this._field[1][i]);
    }
    var row3='';
    for (let i=0; i < this._field[2].length; i++){
      row3 += (this._field[2][i]);
    }
    console.log(row1 + "\n" + row2 + "\n" + row3);
  }
  
  changeCharacter(x, y){
    this._field[y][x] = pathCharacter;
  }
  
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
])

var currentLocation = [0, 0];
var isPlaying = true;

function play(myField){
  myField.print();
  userInput();
  if(isPlaying == true){
    userInput();
  }else if (isPlaying = false);{
    const playAgain = prompt('Do you want to play again? y or n?');
    if(playAgain === 'y'){
      reset();
    }else{
      console.log('Thanks for playing');
    }
  }
}

function userInput(){
  const direction = prompt('Which way?');
  //if the player moves right
  if (direction === 'r'){
    currentLocation[0] += 1;
    testLocation();
  //if the player moves left
  }else if(direction === 'l'){
    currentLocation[0] -= 1;
    testLocation();
  //if the player moves up
  }else if(direction === 'u'){
    currentLocation[1] -= 1;
    testLocation();
  //if the player moves down
  }else if(direction === 'd'){
    currentLocation[1] += 1;
    testLocation();
  //if the player doesn't select a direction
  }else{
    console.log("That is not a valid input, please select 'l', 'r', 'u', 'd'");
    const direction = prompt('Which way?');
  }
}

function testLocation(){
  var x = currentLocation[0];
  var y = currentLocation[1];
  var field = myField.field;
  if (y < 0 || y > 2){
    console.log('That is outside the field, you loose (');
    isPlaying = false;
  }else if (x < 0 || x > 2){
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
    myField.changeCharacter(x, y);
    play(myField);
  }
}

function reset(){
  isPlaying = true;
  currentLocation = [0, 0];
  const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);
  play(myField);
}

play(myField);