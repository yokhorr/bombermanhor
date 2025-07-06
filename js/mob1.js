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

function active(coor) {
    return Math.floor((coor + 25) / 52);
}

function updatePosition(X, Y, color) {
    activeCell = cells[Y][X];
    if (color && activeCell.id === playerColor) {
        alert('death');
    }
    activeCell.id = color;
    activeCell.style.backgroundColor = color;
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const boardElem = document.getElementById('board');
const cells = getArr(boardElem);

let player = document.createElement('div');
player.className = 'circle';
boardElem.appendChild(player);

const playerColor = 'green';
const mobColor = 'purple';
const maxActiveX = 18;
const maxActiveY = 10;
let currX = 5;
let currY = 6;
let activeCell = cells[currY][currX];
activeCell.style.backgroundColor = mobColor;
activeCell.id = mobColor;

function makeMove() {
    let step = getRandomInt(0, 2);
    step = step === 0 ? -1 : 1;

    updatePosition(currX, currY, '');
    if (getRandomInt(0, 2)) {
        const nextX = clamp(currX + step, 0, maxActiveX);
        if (cells[currY][nextX].id === 'brick') {
            makeMove();
            return;
        }
        currX = nextX;
        updatePosition(currX, currY, mobColor);
    } else {
        const nextY = clamp(currY + step, 0, maxActiveY);
        if (cells[nextY][currX].id === 'brick') {
            makeMove();
            return;
        }
        currY = nextY;
        updatePosition(currX, currY, mobColor);
    }
    setTimeout(() => {
        makeMove();
    }, 200);
}

makeMove();
