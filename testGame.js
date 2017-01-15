var myObstacles = [];

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 270;
        this.canvas.height = 480;
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
    myGameArea.start();
}

function updateGameArea() {
    var x, pos, minPos, maxPos;
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(75)) {
        // x = myGameArea.canvas.width;
        minPos = 0;
        maxPos = 4;
        // Returns a random number between min (inclusive) and max (exclusive)
        pos = Math.floor(Math.random()*(maxPos-minPos)+minPos);
        x = pos*60+20;
        myObstacles.push(new component(50, 50, "red", x, 0));
    }
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
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}