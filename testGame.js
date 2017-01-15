var WIDTH = 270;
var HEIGHT = 480;

var myObstacles = [];
var left;
var up;
var down;
var right;

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function startGame() {
    left = new component(50, 50, "blue", 0*60+20, HEIGHT - 70);
    up = new component(50, 50, "blue", 1*60+20, HEIGHT - 70);
    down = new component(50, 50, "blue", 2*60+20, HEIGHT - 70);
    right = new component(50, 50, "blue", 3*60+20, HEIGHT - 70);
    myGameArea.start();
}

function updateGameArea() {
    var x, pos, minPos, maxPos;
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyInterval(75)) {
        // x = myGameArea.canvas.width;
        minPos = 0;
        maxPos = 4;
        // Returns a random number between min (inclusive) and max (exclusive)
        pos = Math.floor(Math.random()*(maxPos-minPos)+minPos);
        x = pos*60+20;
        myObstacles.push(new component(50, 50, "red", x, 0));
    }
    left.update();
    up.update();
    down.update();
    right.update();
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].y += 1;
        myObstacles[i].update();
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.changeColor = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function everyInterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
            left.changeColor();
            break;

        case 38: // up
            up.changeColor();
            break;

        case 39: // right
            right.changeColor();
            break;

        case 40: // down
            down.changeColor();
            break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});