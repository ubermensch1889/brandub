﻿import Piece from './Piece.js';

export default class King extends Piece {
    constructor(){
        super("defender", "https://i.imgur.com/5K8ShyZ.png");
    }
    
    isKing() {
        return true
    }

    isMovePossible(src, dest){
        // ходить вертикально можно
        if (src % 7 === dest % 7) return true;
        
        // проверка на ход по горизонтали
        return Math.floor(src / 7) * 7 <= dest < Math.floor(src / 7) * 7 + 7;
    }
}