var score = 0;
var lives = 3;
var livesDisplay = document.querySelector('#livesDisplay');
var scoreDisplay = document.querySelector('#scoreDisplay');
let world = [];
let gameOver = false;

//standard world
var world1 = [
    [1,1,1,1,1],
    [1,0,2,2,1],
    [1,2,1,2,1],
    [1,2,3,2,1],
    [1,3,2,2,1],
    [1,2,1,2,1],
    [1,2,3,2,1],
    [1,3,2,2,1],
    [1,2,1,2,1],
    [1,2,3,2,1],
    [1,1,1,1,1]
];
//double size world
var world2 = [
    [1, 1, 1, 1, 1,1,1,1,1],
    [1, 0, 2, 2, 1,2,2,0,1],
    [1, 2, 1, 2, 2,2,1,2,1],
    [1, 2, 3, 2, 1,2,3,2,1],
    [1, 3, 2, 2, 1,2,2,3,1],
    [1, 2, 1, 2, 2,2,1,2,1],
    [1, 2, 3, 2, 1,2,3,2,1],
    [1, 3, 2, 2, 1,2,2,3,1],
    [1, 2, 1, 2, 2,2,1,2,1],
    [1, 2, 3, 2, 1,2,3,2,1],
    [1, 1, 1, 1, 1,1,1,1,1]
];
//scarce food world
var world3 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 2, 0, 1, 2, 0, 0, 1],
    [1, 2, 1, 2, 2, 2, 1, 2, 1],
    [1, 0, 3, 0, 1, 0, 3, 0, 1],
    [1, 3, 2, 2, 1, 2, 2, 3, 1],
    [1, 0, 1, 0, 2, 0, 1, 0, 1],
    [1, 2, 3, 2, 1, 2, 3, 2, 1],
    [1, 0, 2, 0, 1, 0, 2, 0, 1],
    [1, 2, 1, 2, 2, 2, 1, 2, 1],
    [1, 0, 3, 0, 1, 0, 3, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1]
];

var worldDict = {
    0: 'blank',
    1: 'wall',
    2: 'sushi',
    3: 'onigiri'
};


//randomize worlds
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
var build = getRandomInt(0, 3);

if (build == 0) {
    world = world1;
}
else if (build == 1) {
    world = world2;
}
else if (build == 2) {
    world = world3;
}

function drawWorld() {
    var output = '';
    
    for (var row = 0; row < world.length; row++){
        output += "<div class='row'>";
        for ( var x = 0; x < world[row].length; x++){
            output += "<div class='"+worldDict[world[row][x]]+"'></div>";
        }
        output += "</div>";
    }
    
    document.getElementById('world').innerHTML = output;
};

drawWorld();

// draw ninjaman
var ninjaman = {
    x: 1,
    y: 1
}

function drawNinjaman(){
    document.getElementById('ninjaman').style.top = ninjaman.y * 40 + 'px'
    document.getElementById('ninjaman').style.left = ninjaman.x * 40 + 'px'
}

//move ninjaman
document.onkeydown = function(e){
    if(e.keyCode == 37 && world[ninjaman.y][ninjaman.x - 1] != 1){
        ninjaman.x--;
    }
    if(e.keyCode == 39 && world[ninjaman.y][ninjaman.x + 1] != 1){
        ninjaman.x++;
    }
    if(e.keyCode == 38 && world[ninjaman.y -1][ninjaman.x] != 1){
        ninjaman.y--;
    }
    if(e.keyCode == 40 && world[ninjaman.y +1][ninjaman.x] != 1){
        ninjaman.y++;
    }
    
    //Score
    if (world[ninjaman.y][ninjaman.x] == 2) {
        score += 10;
    }
    if (world[ninjaman.y][ninjaman.x] == 3) {
        score +=5;
    }
    scoreDisplay.textContent = score;
    
    //ninjaman eats stuff
    world[ninjaman.y][ninjaman.x] = 0;
    drawWorld();
    drawNinjaman();
    drawBluey();
}

function reset() {
    ninjaman = {
        x: 1,
        y: 1
    };
    bluey = {
        x: 1,
        y: 9
    };
    drawWorld();
    drawNinjaman();
    drawBluey();

}

//draw bluey
var bluey = {
    x: 1,
    y: 9
}

function drawBluey() {
    document.getElementById('bluey').style.top = bluey.y * 40 + 'px'
    document.getElementById('bluey').style.left = bluey.x * 40 + 'px'
}

drawBluey();

//move bluey
function moveBluey() {
    let blueMove = 0;
    blueMove = getRandomInt(37, 41);
    if (blueMove == 37 && world[bluey.y][bluey.x - 1] != 1) {
        bluey.x--;
    }
    if (blueMove == 39 && world[bluey.y][bluey.x + 1] != 1) {
        bluey.x++;
    }
    if (blueMove == 38 && world[bluey.y - 1][bluey.x] != 1) {
        bluey.y--;
    }
    if (blueMove == 40 && world[bluey.y + 1][bluey.x] != 1) {
        bluey.y++;
    }
    drawBluey();

}

var blueyHunt = setInterval(moveBluey, 500);

//monster touches ninjaman
if (ninjaman.x == bluey.x && ninjaman.y == bluey.y) {
    lives--;
    reset();
};
if (lives == 0) {
    clearInterval(blueyHunt);
    gameOver = true;
}

livesDisplay.textContent = lives;

function checkLives() {
    console.log(lives);
} 
