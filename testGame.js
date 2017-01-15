var WIDTH = 270;
var HEIGHT = 480;

var myObstacles = [];
var left;
var up;
var down;
var right;

var score = document.getElementById('score');
score = 0;

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
    var left_inactive = document.getElementById('button_left_inactive');
    var left_active = document.getElementById('button_left_active');
    var up_inactive = document.getElementById('button_up_inactive');
    var up_active = document.getElementById('button_up_active');
    var down_inactive = document.getElementById('button_down_inactive');
    var down_active = document.getElementById('button_down_active');
    var right_inactive = document.getElementById('button_right_inactive');
    var right_active = document.getElementById('button_right_active');
    left = new draw(50, 50, 0*60+20, HEIGHT - 70, left_inactive, left_active);
    up = new draw(50, 50, 1*60+20, HEIGHT - 70, up_inactive, up_active);
    down = new draw(50, 50, 2*60+20, HEIGHT - 70, down_inactive, down_active);
    right = new draw(50, 50, 3*60+20, HEIGHT - 70, right_inactive, right_active);
    myGameArea.start();
}

function updateGameArea() {
    var x, pos, minPos, maxPos;
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyInterval(75)) {
        minPos = 0;
        maxPos = 4;
        // Returns a random number between min (inclusive) and max (exclusive)
        pos = Math.floor(Math.random()*(maxPos-minPos)+minPos);
        x = pos*60+20;
        switch (pos) {
            case 0:
                var img = document.getElementById('left_arrow');
                break;
            case 1:
                var img = document.getElementById('up_arrow');
                break;
            case 2:
                var img = document.getElementById('down_arrow');
                break;
            case 3:
                var img = document.getElementById('right_arrow');
                break;
        }
        myObstacles.push(new draw(50, 50, x, -50, img, img));
    }
    left.redraw();
    up.redraw();
    down.redraw();
    right.redraw();
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].y += 1;
        if (myObstacles[i].y >= HEIGHT) {
            myObstacles.splice(myObstacles.indexOf(myObstacles[i]), 1);
        }
        myObstacles[i].redraw();
    }
}

// function component(width, height, color, x, y) {
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     this.update = function() {
//         ctx = myGameArea.context;
//         ctx.fillStyle = color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
//     this.changeColor = function() {
//         ctx = myGameArea.context;
//         ctx.fillStyle = "white";
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
// }

function draw(width, height, x, y, inactiveImg, activeImg) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.redraw = function() {
        ctx = myGameArea.context;
        ctx.drawImage(inactiveImg, this.x, this.y, this.width, this.height);
    };
    this.flash = function() {
        ctx = myGameArea.context;
        ctx.drawImage(activeImg, this.x, this.y, this.width, this.height);
    }
}

function everyInterval(n) {
    return (myGameArea.frameNo / n) % 1 == 0;

}

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
            left.flash();
            for (i = 0; i < myObstacles.length; i += 1) {
                console.log(myObstacles[i].id);
                if (myObstacles[i].x == 0*60+20 && myObstacles[i].y >= HEIGHT - 80 && myObstacles[i].y <= HEIGHT - 60) {
                    score++;
                    document.getElementById('score').innerHTML = "Score: " + score;
                    myObstacles.splice(myObstacles.indexOf(myObstacles[i]), 1);
                    console.log("got to here");
                }
            }
            break;

        case 38: // up
            up.flash();
            for (i = 0; i < myObstacles.length; i += 1) {
                if (myObstacles[i].id == 1*60+20 && myObstacles[i].y >= HEIGHT - 80 && myObstacles[i].y <= HEIGHT - 60) {
                    score++;
                    document.getElementById('score').innerHTML = "Score: " + score;
                    myObstacles.splice(myObstacles.indexOf(myObstacles[i]), 1);
                }
            }
            break;

        case 39: // right
            right.flash();
            for (i = 0; i < myObstacles.length; i += 1) {
                if (myObstacles[i].id == 2*60+20 && myObstacles[i].y >= HEIGHT - 80 && myObstacles[i].y <= HEIGHT - 60) {
                    score++;
                    document.getElementById('score').innerHTML = "Score: " + score;
                    myObstacles.splice(myObstacles.indexOf(myObstacles[i]), 1);
                }
            }
            break;

        case 40: // down
            down.flash();
            for (i = 0; i < myObstacles.length; i += 1) {
                if (myObstacles[i].id == 3*60+20 && myObstacles[i].y >= HEIGHT - 80 && myObstacles[i].y <= HEIGHT - 60) {
                    score++;
                    document.getElementById('score').innerHTML = "Score: " + score;
                    myObstacles.splice(myObstacles.indexOf(myObstacles[i]), 1);
                }
            }
            break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});