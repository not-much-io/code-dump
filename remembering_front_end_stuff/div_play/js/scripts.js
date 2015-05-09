
function getPos(el) {
    for (var lx=0, ly=0;
         el != null;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {'x': lx,'y': ly};
}

window.onload = function () {

    console.log("onload");

    var squareDiv = document.getElementById("divididiv");

    document.onkeydown = function(e) {
        var pos = getPos(squareDiv);
        console.log(pos);
        var step_size = 25;
        switch (e.keyCode) {
            case 37:
                squareDiv.style.left = (pos['x'] - step_size).toString() + "px";
                console.log('left');
                break;
            case 38:
                squareDiv.style.top = (pos['y'] - step_size).toString() + "px";
                console.log('up');
                break;
            case 39:
                squareDiv.style.left = (pos['x'] + step_size).toString() + "px";
                console.log('right');
                break;
            case 40:
                squareDiv.style.top = (pos['y'] + step_size).toString() + "px";
                console.log('down');
                break;
        }
    };
};

function changeColor() {
    var square = document.getElementById("divididiv");
    console.log(square.style.backgroundColor);
    if (square.style.backgroundColor == "rgb(245, 245, 220)") {
        square.style.backgroundColor = "black";
    } else {
        square.style.backgroundColor = "beige";
    }
}

function changeSize() {
    var square = document.getElementById("divididiv");
    if (square.style.width == "200px") {
        square.style.height = "100px";
        square.style.width = "100px";
    } else {
        square.style.width = "200px";
        square.style.height = "200px";
    }
}