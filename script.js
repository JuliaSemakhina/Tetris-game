document.addEventListener('DOMContentLoaded', ()=>{

const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'));
const width = 10;
let nextRandom = 0;
let timerId;
let score = 0;
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-button');
const colors = ['orange', 'red', 'green', 'purple', 'lightblue'];

const lShape = [
	[1, width+1, width*2+1, 2], 
	[width, width+1, width+2, width*2+2],
	[1, width+1, width*2+1, width*2],
	[width, width*2, width*2+1, width*2+2]
];

const zShape = [
	[0, 1, width+1, width+2],
	[width*2, width, width+1, 1],
	[0, 1, width+1, width+2],
	[width*2, width, width+1, 1]
];

const oShape = [
	[0, 1, width, width+1],
	[0, 1, width, width+1],
	[0, 1, width, width+1],
	[0, 1, width, width+1]
];

const tShape = [
	[width, width+1, width+2, width*2+1],
	[1, width,  width+1, width*2+1],
	[1, width, width+1, width+2],
	[1, width+1, width+2, width*2+1]
];

const iShape = [
	[width*3+1, width*2+1, width+1, 1],
	[width*2, width*2+1, width*2+2, width*2+3],
	[width*3+1, width*2+1, width+1, 1],
	[width*2, width*2+1, width*2+2, width*2+3]
];

const theShapes = [lShape, zShape, tShape, oShape, iShape];

let currentPosition = 4;
let currentRotation = 0;

//randomly select a shape and its first rotation
let random = Math.floor(Math.random()*theShapes.length);
let current = theShapes[random][currentRotation];
console.log(current);

//draw the shape
function draw() {
	current.forEach(index=> {
		squares[currentPosition+index].classList.add('tetromino');
		squares[currentPosition+index].style.backgroundColor = colors[random];
	})
}

//undraw the Shape
function undraw() {
	current.forEach(index=> {
		squares[currentPosition+index].classList.remove('tetromino');
		squares[currentPosition+index].style.backgroundColor = '';
	})
}

//Move the shapes down
// timerId = setInterval(moveDown, 1000);

//assign function to keyCodes
function controle(e){
	if(e.keyCode === 37) {
		moveLeft()
	} else if (e.keyCode === 38) {
		rotate()
	} else if (e.keyCode === 39) {
		moveRight()
	} else if (e.keyCode === 40) {
		moveDown()
	}
}

document.addEventListener('keyup', controle);

function moveDown(){
	undraw();
	currentPosition += width;
	draw();
	freeze();
}

//freeze
function freeze() {
	if(current.some(index=> 
		squares[currentPosition+index+width].classList.contains('taken'))){
		current.forEach(index=> 
			squares[currentPosition+index].classList.add('taken'))
		//start new shape falling
		random = nextRandom;
		nextRandom = Math.floor(Math.random()*theShapes.length);
		current = theShapes[random][currentRotation];
		currentPosition = 4;
		draw();
		displayShape();
		addScore();
		gameOver();
	}
}

//move the shape left
function moveLeft(){
	undraw();
	const isAtLeftEdge = current.some(index=> 
		(currentPosition + index)%width === 0);
	if(!isAtLeftEdge)currentPosition-=1;
	if(current.some(index=> 
		squares[currentPosition+index].classList.contains('taken'))) {
		currentPosition +=1;
	}
	draw();
}

//move the shape right
function moveRight(){
	undraw();
	const isAtRightEdge = current.some(index=> 
		(currentPosition + index)%width === width -1);
	if(!isAtRightEdge)currentPosition+=1;
	if(current.some(index=> 
		squares[currentPosition+index].classList.contains('taken'))) {
		currentPosition -=1;
	}
	draw();
}

//rotate the show 
function rotate() {
	undraw();
	currentRotation++;

	if(currentRotation === current.length){
		currentRotation = 0
	}
	current = theShapes[random][currentRotation];
	draw();
}

//show upcoming shape in a separate box

const displaySquares = document.querySelectorAll('.mini-grid div');
const displayWidth = 4;
let displayIndex = 0;


//the Shapes
const upNextShapes = [
	[1, displayWidth+1, displayWidth*2+1, 2], //lShape
	[0, displayWidth, displayWidth+1, displayWidth*2+1], //zShape
	[1, displayWidth, displayWidth+1, displayWidth+2], //tSape
	[0, 1, displayWidth, displayWidth+1], //oShape
	[displayWidth*3+1, displayWidth*2+1, displayWidth+1, 1] //iShape
];

//display the shape in mini-grid
function displayShape() {
	displaySquares.forEach(square=> {
		square.classList.remove('tetromino')
		square.style.backgroundColor = ''
	})
	upNextShapes[nextRandom].forEach(index => {
		displaySquares[displayIndex + index].classList.add('tetromino')
		displaySquares[displayIndex+index].style.backgroundColor=colors[nextRandom];
});
}


//add functionality to start button

startBtn.addEventListener('click', ()=> {
	if(timerId) {
		clearInterval(timerId)
		timerId = null
	} else {
		draw()
		timerId = setInterval(moveDown, 1000);
		nextRandom = Math.floor(Math.random()*theShapes.length);
		displayShape();
	}
})

//add score
function addScore() {
	for(let i =0; i < 199; i +=width){
	const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

	if(row.every(index=> squares[index].classList.contains('taken'))){
		score +=10;
		scoreDisplay.innerHTML = score;
		row.forEach(index => {
			squares[index].classList.remove('taken')
			squares[index].classList.remove('tetromino')
			squares[index].style.backgroundColor = ''
		})
		const squaresRemoved = squares.splice(i, width);
		squares = squaresRemoved.concat(squares);
		squares.forEach(cell => grid.appendChild(cell));
	}
	}
}


//Game over
function gameOver(){
	if(current.some(index => squares[currentPosition+index].classList.contains('taken'))){
		scoreDisplay.innerHTML = 'end'
		clearInterval(timerId)
	}
}

});