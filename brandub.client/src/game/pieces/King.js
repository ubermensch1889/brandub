import Piece from './Piece.js';

export default class King extends Piece {
    constructor(){
        super("defender", "https://psv4.userapi.com/c909218/u179121380/docs/d50/36f9be664f28/free-icon-shield-11280663.png?extra=IcXlFIT7bmqqeujGHDrK-c0Q7485eRT7L_vkaXBMQcDKdO4YSW6gQBNBuJRuEg2wCgLQpeuQ9ova7Uf19NMyD8RzEIb-twPD_nnmn0zR3NyRPr0LJqu3fyimdIXBTNcFWCQBiX_qAqhfsC2pM5Q_XDiGFw");
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