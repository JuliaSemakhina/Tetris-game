document.addEventListener('DOMContentLoaded', ()=>{

const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'));
const width = 10;
const ScoreDisplay = document.getElementById('score');
const StartBtn = document.getElementById('start-button');

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

const theShapes = [lShape, tShape, oShape, iShape, zShape];

let currentPosition = 4;
let currentRotation = 0;

//randomly select a shape and its first rotation
let random = Math.floor(Math.random()*theShapes.length);
let current = theShapes[random][currentRotation];
console.log(random);

//draw the first rotation in the first shape
function draw() {
	current.forEach(index=> {
		squares[index].classList.add('tetromino');
	})
}

draw();


});