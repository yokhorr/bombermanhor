"use strict"

function clamp(num, min, max) {
    return num <= min
        ? min
        : num >= max
            ? max
            : num
}

function getArr(board) {
    const rowsArr = board.children;
    const arr = [];
    for (let row of rowsArr) {
        arr.push([]);
        for (let el of row.children) {
            arr[arr.length - 1].push(el);
        }
    }
    return arr;
}

const boardElem = document.getElementById('board');
const arr = getArr(boardElem);
let player = document.createElement('div');
player.className = 'circle';
boardElem.appendChild(player);
let currX = 0;
let currY = 0;
const height = boardElem.getBoundingClientRect().height - 50;
const width = boardElem.getBoundingClientRect().width - 50;

let activeCell = arr[0][0];

function updatePosition(x, y) {
    console.log(y, x);
    player.style.top = y + 'px';
    player.style.left = x + 'px';
    console.log(player.style.top, player.style.left);
    activeCell = arr[Math.floor((y + 25) / 52)][Math.floor((x + 25) / 52)];
    activeCell.style.backgroundColor = 'red';
}

const step = 10;

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37: // left
            currX = clamp(currX - step, 0, width);
            break;
        case 38: // up
            currY = clamp(currY - step, 0, height);
            break;
        case 39: // right
            currX = clamp(currX + step, 0, width);
            break;
        case 40: // down
            currY = clamp(currY + step, 0, height);
            break;
    }
    updatePosition(currX, currY);
};