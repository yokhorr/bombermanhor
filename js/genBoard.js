"use strict"

{
    const board = document.createElement('div');
    board.className = 'board';
    board.id = 'board';

    function createSquare() {
        const square = document.createElement('div');
        square.className = 'square';
        return square;
    }

    function createRow() {
        const row = document.createElement('div');
        row.className = 'row';
        for (let i = 0; i < 19; i++) {
            row.append(createSquare());
        }
        return row;
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

    for (let i = 0; i < 11; i++) {
        board.append(createRow());
    }

    const arr = getArr(board);

    for (let i = 1; i < arr.length - 1; i++) {
        for (let j = 1; j < arr[i].length - 1; j++) {
            if (i % 2 === 1 && j % 2 === 1) {
                arr[i][j].style.backgroundColor = 'black';
                arr[i][j].id = 'brick';
            }
        }
    }

    document.getElementById('container').appendChild(board);
}
