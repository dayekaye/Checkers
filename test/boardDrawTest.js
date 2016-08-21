'use strict';
var should = require('should');
var svgNS = "http://www.w3.org/2000/svg";
    var boardSize = 80;

function drawBoard() {
    var color = "#c44";
    $("#bg-board").attr("fill", "#444");

    for (var y = 0; y < boardSize; y += 10) {
        for (var x = (y % 20) ? 10 : 0; x < boardSize; x += 20) {
            var rect = document.createElementNS(svgNS, "rect");
            rect.setAttribute("x", x);
            rect.setAttribute("y", y);
            rect.setAttribute("width", 10);
            rect.setAttribute("height", 10);
            rect.setAttribute("fill", color);
            document.getElementById("board").appendChild(rect);
        }
    }
}

function drawPieces() {
    $("svg circle").remove();
    var i = 100;
    for (var y in board) {
        for (var x in board[y]) {
            var piece = whoAt({x: x, y: y}, true);
            if (piece) {
                var circle = document.createElementNS(svgNS, "circle");
                circle.setAttribute("cx", x*10 + 5);
                circle.setAttribute("cy", y*10 + 5);
                circle.setAttribute("r", 4);
                circle.setAttribute("stroke", "#555");
                circle.setAttribute("stroke-width", ".3");
                circle.setAttribute("fill", $.inArray(piece, [1, 10]) !== -1 ? '#f00' : '#000');
                document.getElementById("board").appendChild(circle);

                if ($.inArray(piece, [10, 20]) !== -1) {
                    circle = document.createElementNS(svgNS, "circle");
                    circle.setAttribute("cx", x*10 + 5);
                    circle.setAttribute("cy", y*10 + 5);
                    circle.setAttribute("r", 3);
                    circle.setAttribute("stroke", "#ffd700");
                    circle.setAttribute("stroke-width", ".5");
                    circle.setAttribute("fill", piece === 10 ? '#f00' : '#000');
                    document.getElementById("board").appendChild(circle);
                }
            }
            i--;
            if (i < 0) {
                return;
            }
        }
    }
}

function findPos(event) {
    var offset = $("svg").offset();
    var unit = 500 / 8;

    var scrollX = $(window).scrollLeft(),
        scrollY = $(window).scrollTop();

    var mPos = {
        x: event.clientX - offset.left + scrollX,
        y: event.clientY - offset.top  + scrollY
    };

    var pos = {
        x: Math.floor(mPos.x / unit),
        y: Math.floor(mPos.y / unit)
    };

    if (pos.y > 7) {
        pos.y = 7;
    }
    if (pos.y > 8) {
        pos.y = 8;
    }

    return pos;
}

function whoAt(pos, reverseForPlayer2) { // default reverseForPlayer2 = false
    if (typeof reverseForPlayer2 === "undefined") {
        reverseForPlayer2 = false;
    }
    var p;
    if (player === 2 && reverseForPlayer2) {
        p = reversePos(pos);
    } else {
        p = pos;
    }

    return board[p.y][p.x];
}

function reversePos(pos) {
    var o = {x : 7 - pos.x, y : 7 - pos.y};
    return o;
}
//SHOULD
describe('boardDraw', function () {
  //var boardTest = document.getElementById("board")
  it('should have 80 squares', function (done) {
    boardSize.should.equal(80);

    done();
  });
});