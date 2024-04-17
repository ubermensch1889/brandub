export default class Piece {
    constructor(player, iconUrl){
        this.player = player
        this.style = {backgroundImage: "url('"+iconUrl+"')"}
    }
    
    isKing() {
        return false;
    }
    isMovePossible(src, dest){
        // нельзя ходить в центр и по краям
        if (dest === 24 || dest === 0 || dest === 6 || dest === 42 || dest === 48) return false;

        // ходить вертикально можно
        if (src % 7 === dest % 7) return true;

        // проверка на ход по горизонтали
        return Math.floor(src / 7) * 7 <= dest < Math.floor(src / 7) * 7 + 7;
    }

    getSrcToDestPath(src, dest){
        let path = []

        // рассчитываем путь в случае хода по вертикали
        if (src % 7 === dest % 7) {
            let increment = -7, pathStart = src - 7;
            if (src < dest) {
                increment = 7;
                pathStart = src + 7;
            }
            for (let i = pathStart; i !== dest; i += increment) {
                path.push(i)
            }
        }
        // рассчитываем путь в случае хода по горизонтали
        else {
            let increment = -1, pathStart = src - 1;
            if (src < dest) {
                increment = 1;
                pathStart = src + 1;
            }
            for (let i = pathStart; i !== dest; i += increment) {
                path.push(i)
            }
        }

        return path;
    }
}