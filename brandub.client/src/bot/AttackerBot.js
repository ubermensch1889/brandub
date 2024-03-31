// определяем интерфейс для нашего бота
import Bot from "@/bot/Bot.js";

export default class AttackerBot extends Bot{
    constructor() {
        super();
        this.squares = null
    }
    
    /* 
    Суть бота довольно проста:
    сначала он ест короля, если есть такая возможность,
    потом он ест обычную фигуру. Если бот не может никого съесть, 
    он ставит фигуру рядом с вражеской (когда это безопасно), чтобы попытаться съесть ее далее.
    */
    makeMove(squares) {
        this.squares = squares
        if (this.eatKing()) {
            console.log("eatKing")
            return
        }
        
        if (this.eatSomeThing()) {
            console.log("eatSmth")
            return
        }
        
        console.log("justMove")
        console.log(this.justMove())
    }

    eatKing() {
        const tryEat = (src, dest) => {
            const srcToDestPath = this.squares[src].getSrcToDestPath(src, dest)
            const isMoveLegal = this.isMoveLegal(srcToDestPath);
            const isMovePossible = this.squares[src].isMovePossible(src, dest)

            if (!isMoveLegal || !isMovePossible) return false

            this.squares[dest] = this.squares[src]
            this.squares[src] = null;
            return true;
        }
        
        
        for (let i = 0; i < 49; ++i) {
            if (!this.squares[i]) continue
            
            if (this.squares[i].player === "attacker") {
                for (let j = 0; j < 7; ++j) {
                    let pos =  i % 7 + j * 7
                    let possible = true
                    if (i === pos || this.squares[pos]) possible = false
                    
                    // проверяем ходы по вертикали, когда король наверху
                    if (possible && j < 5 && this.squares[pos + 14] && this.squares[pos + 7] &&
                        this.squares[pos + 14].player === "attacker" && 
                        this.squares[pos + 7].isKing()) {
                        if (tryEat(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда король внизу
                    if (possible && j > 2 && this.squares[pos - 14] && this.squares[pos - 7] &&
                        this.squares[pos - 14].player === "attacker" &&
                        this.squares[pos - 7].isKing()) {
                        if (tryEat(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда король справа
                    if (possible && Math.floor((pos + 2) / 7) === Math.floor(pos / 7) && this.squares[pos + 2] && this.squares[pos + 1] &&
                        this.squares[pos + 2].player === "attacker" &&
                        this.squares[pos + 1].isKing()) {
                        if (tryEat(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда король слева
                    if (possible && Math.floor((pos - 2) / 7) === Math.floor(pos / 7) && this.squares[pos - 2] && this.squares[pos - 1] &&
                        this.squares[pos - 2].player === "attacker" &&
                        this.squares[pos - 1].isKing()) {
                        if (tryEat(i, pos)) return true;
                    }

                    pos = Math.floor(i / 7) * 7 + j
                    if (i === pos || this.squares[pos]) continue

                    // проверяем ходы по горизонтали, когда король наверху
                    if (pos + 14 <= 48 && this.squares[pos + 14] && this.squares[pos + 7] &&
                        this.squares[pos + 14].player === "attacker" &&
                        this.squares[pos + 7].isKing()) {
                        if (tryEat(i, pos)) return true;
                    }

                    // проверяем ходы по горизонтали, когда король внизу
                    if (pos - 14 >= 0 && this.squares[pos - 14] && this.squares[pos - 7] &&
                        this.squares[pos - 14].player === "attacker" &&
                        this.squares[pos - 7].isKing()) {
                        if (tryEat(i, pos)) return true;
                    }
                    
                    // проверяем ходы по горизонтали, когда король справа
                    if (j < 5 && this.squares[pos + 2] && this.squares[pos + 1] &&
                        this.squares[pos + 2].player === "attacker" &&
                        this.squares[pos + 1].isKing()) {
                        if (tryEat(i, pos)) return true;
                    }

                    // проверяем ходы по горизонтали, когда король слева
                    if (j > 2 && this.squares[pos - 2] && this.squares[pos - 1] &&
                        this.squares[pos - 2].player === "attacker" &&
                        this.squares[pos - 1].isKing()) {
                        if (tryEat(i, pos)) return true;
                    }
                }
             }
        }
        
        return false;
    }

    isMoveLegal(srcToDest) {
        for (let i = 0; i < srcToDest.length; ++i) {
            if (this.squares[srcToDest[i]]) return false;
        }
        return true;
    }

    eatSomeThing() {
        const tryEat = (src, dest) => {
            const srcToDestPath = this.squares[src].getSrcToDestPath(src, dest)
            const isMoveLegal = this.isMoveLegal(srcToDestPath);
            const isMovePossible = this.squares[src].isMovePossible(src, dest)

            if (!isMoveLegal || !isMovePossible) return false

            this.squares[dest] = this.squares[src]
            this.squares[src] = null;
            return true;
        }


        for (let i = 0; i < 49; ++i) {
            if (!this.squares[i]) continue

            if (this.squares[i].player === "attacker") {
                for (let j = 0; j < 7; ++j) {
                    let pos =  i % 7 + j * 7
                    let possible = true
                    if (i === pos || this.squares[pos]) possible = false

                    // проверяем ходы по вертикали, когда защитник наверху
                    if (possible && j < 5 && this.squares[pos + 14] && this.squares[pos + 7] &&
                        this.squares[pos + 14].player === "attacker" &&
                        this.squares[pos + 7].player === "defender") {
                        if (tryEat(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда защитник внизу
                    if (possible && j > 2 && this.squares[pos - 14] && this.squares[pos - 7] &&
                        this.squares[pos - 14].player === "attacker" &&
                        this.squares[pos - 7].player === "defender") {
                        if (tryEat(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда защитник справа
                    if (possible && Math.floor((pos + 2) / 7) === Math.floor(pos / 7) && this.squares[pos + 2] && this.squares[pos + 1] &&
                        this.squares[pos + 2].player === "attacker" &&
                        this.squares[pos + 1].player === "defender") {
                        if (tryEat(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда защитник слева
                    if (possible && Math.floor((pos - 2) / 7) === Math.floor(pos / 7) && this.squares[pos - 2] && this.squares[pos - 1] &&
                        this.squares[pos - 2].player === "attacker" &&
                        this.squares[pos - 1].player === "defender") {
                        if (tryEat(i, pos)) return true;
                    }

                    pos = Math.floor(i / 7) * 7 + j
                    if (i === pos || this.squares[pos]) continue

                    // проверяем ходы по горизонтали, когда защитник наверху
                    if (pos + 14 <= 48 && this.squares[pos + 14] && this.squares[pos + 7] &&
                        this.squares[pos + 14].player === "attacker" &&
                        this.squares[pos + 7].player === "defender") {
                        if (tryEat(i, pos)) return true;
                    }

                    // проверяем ходы по горизонтали, когда защитник внизу
                    console.log("asdf")
                    console.log(pos)
                    if (pos - 14 >= 0 && this.squares[pos - 14] && this.squares[pos - 7] &&
                        this.squares[pos - 14].player === "attacker" &&
                        this.squares[pos - 7].player === "defender") {
                        if (tryEat(i, pos)) return true;
                    }

                    // проверяем ходы по горизонтали, когда защитник справа
                    if (j < 5 && this.squares[pos + 2] && this.squares[pos + 1] &&
                        this.squares[pos + 2].player === "attacker" &&
                        this.squares[pos + 1].player === "defender") {
                        if (tryEat(i, pos)) return true;
                    }

                    // проверяем ходы по горизонтали, когда защитник слева
                    if (j > 2 && this.squares[pos - 2] && this.squares[pos - 1] &&
                        this.squares[pos - 2].player === "attacker" &&
                        this.squares[pos - 1].player === "defender") {
                        if (tryEat(i, pos)) return true;
                    }
                }
            }
        }

        return false;
    }

    justMove() {
        const tryMove = (src, dest) => {
            const srcToDestPath = this.squares[src].getSrcToDestPath(src, dest)
            const isMoveLegal = this.isMoveLegal(srcToDestPath);
            const isMovePossible = this.squares[src].isMovePossible(src, dest)

            if (!isMoveLegal || !isMovePossible) return false

            this.squares[dest] = this.squares[src]
            this.squares[src] = null;
            return true;
        }

        for (let i = 0; i < 49; ++i) {
            if (!this.squares[i]) continue

            if (this.squares[i].player === "attacker") {
                for (let j = 0; j < 7; ++j) {
                    let pos =  i % 7 + j * 7
                    let isDangerous = false
                    let possible = true
                    if (i === pos || this.squares[pos]) possible = false

                    // проверяем опасно ли пойти по вертикали
                    if (possible && Math.floor((pos + 1) / 7) === Math.floor((pos - 1) / 7) && this.squares[pos + 1] && 
                        this.squares[pos - 1] && this.squares[pos + 1].player === "defender" &&
                        this.squares[pos - 1].player === "defender") {
                        isDangerous = true
                    }

                    // проверяем ходы по вертикали, когда защитник внизу
                    if (possible && !isDangerous && j > 2 && !this.squares[pos - 14] && this.squares[pos - 7] &&
                        this.squares[pos - 7].player === "defender") {
                        if (tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда защитник сверху
                    if (possible && !isDangerous && j < 5 && !this.squares[pos + 14] && this.squares[pos + 7] &&
                        this.squares[pos + 7].player === "defender") {
                        if (tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда защитник справа
                    if (possible && !isDangerous && Math.floor(pos / 7) === Math.floor((pos + 2) / 7) && !this.squares[pos + 2] && this.squares[pos + 1] &&
                        this.squares[pos + 1].player === "defender") {
                        if (tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда защитник слева
                    if (possible && !isDangerous && Math.floor(pos / 7) === Math.floor((pos - 2) / 7) && !this.squares[pos - 2] && this.squares[pos - 1] &&
                        this.squares[pos - 1].player === "defender") {
                        if (tryMove(i, pos)) return true;
                    }

                    pos = Math.floor(i / 7) * 7 + j
                    isDangerous = false
                    if (i === pos || this.squares[pos]) continue

                    // проверяем опасно ли пойти по горизонтали
                    if (pos + 7 <= 48 && pos - 7 >= 0 && this.squares[pos + 7] &&
                        this.squares[pos - 7] && this.squares[pos + 7].player === "defender" &&
                        this.squares[pos - 7].player === "defender") {
                        isDangerous = true
                    }

                    // проверяем ходы по горизонтали, когда защитник наверху
                    if (!isDangerous && pos + 14 <= 48 && !this.squares[pos + 14] && this.squares[pos + 7] &&
                        this.squares[pos + 7].player === "defender") {
                        if (tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по горизонтали, когда защитник внизу
                    if (!isDangerous && pos - 14 >= 0 && !this.squares[pos - 14] && this.squares[pos - 7] &&
                        this.squares[pos - 7].player === "defender") {
                        if (tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по горизонтали, когда защитник справа
                    if (!isDangerous && j < 5 && !this.squares[pos + 2] && this.squares[pos + 1] &&
                        this.squares[pos + 1].player === "defender") {
                        if (tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по горизонтали, когда защитник слева
                    if (!isDangerous && j > 2 && !this.squares[pos - 2] && this.squares[pos - 1] &&
                        this.squares[pos - 1].player === "defender") {
                        if (tryMove(i, pos)) return true;
                    }
                }
            }
        }
        
        // вариантов как поставить фигуру рядом с врагом не осталось, поэтому ходим хоть как-то

        for (let i = 0; i < 49; ++i) {
            if (!this.squares[i]) continue

            if (this.squares[i].player === "attacker") {
                for (let j = 0; j < 7; ++j) {
                    let pos =  i % 7 + j * 7
                    if (i === pos || this.squares[pos]) continue
                    
                    if (tryMove(i, pos)) return true;

                    pos = Math.floor(i / 7) * 7 + j
                    if (i === pos || this.squares[pos]) continue

                    if (tryMove(i, pos)) return true;
                }
            }
        }
        
        // катастрофа
        return false;
    }
}