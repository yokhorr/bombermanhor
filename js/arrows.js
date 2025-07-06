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

const boardElem = document.getElementById('board');
const cells = getArr(boardElem);
let player = document.createElement('div');
player.className = 'circle';
boardElem.appendChild(player);
let currX = 0;
let currY = 0;
const height = boardElem.getBoundingClientRect().height - 50;
const width = boardElem.getBoundingClientRect().width - 50;
const maxActiveX = 18;
const maxActiveY = 10;

const playerColor = 'green';
let activeCell = cells[0][0];
activeCell.style.backgroundColor = playerColor;

function updatePosition(x, y, color) {
    console.log(y, x);
    player.style.top = y + 'px';
    player.style.left = x + 'px';
    console.log(player.style.top, player.style.left);
    activeCell = cells[clamp(active(y), 0, maxActiveY)][clamp(active(x), 0, maxActiveX)];
    activeCell.style.backgroundColor = color;
}

const step = 5;

document.onkeydown = function (e) {
    updatePosition(currX, currY, '');
    const activeX = clamp(active(currX), 0, maxActiveX);
    const activeY = clamp(active(currY), 0, maxActiveY);
    console.log('activeX: ', activeX);
    console.log('activeY: ', activeY);
    switch (e.keyCode) {
        case 37: // left
            if (cells[activeY][Math.max(0, activeX - 1)].id !== 'brick') {
                currX = clamp(currX - step, 0, width);
            }
            break;
        case 38: // up
            if (cells[Math.max(0, activeY - 1)][activeX].id !== 'brick') {
                currY = clamp(currY - step, 0, height);
            }
            break;
        case 39: // right
            if (cells[activeY][Math.min(activeX + 1, maxActiveX)].id !== 'brick') {
                currX = clamp(currX + step, 0, width);
            }
            break;
        case 40: // down
            console.log('activeY: ', activeY);
            console.log('maxActiveY: ', maxActiveY);
            if (cells[Math.min(activeY + 1, maxActiveY)][activeX].id !== 'brick') {
                currY = clamp(currY + step, 0, height);
            }
            break;
    }
    updatePosition(currX, currY, playerColor);
};
