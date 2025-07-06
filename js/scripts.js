"use strict"

const board = document.createElement('div');
board.className = 'board';

function createSquare() {
    const square = document.createElement('div');
    square.className = 'square';
    return square;
}

function createRow() {
    const row = document.createElement('div');
    row.className = 'row';
    for (let i = 0; i < 20; i++) {
        row.append(createSquare());
    }
    return row;
}

for (let i = 0; i < 12; i++) {
    board.append(createRow());
}

document.getElementById('container').appendChild(board);