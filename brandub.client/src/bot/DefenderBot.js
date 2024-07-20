// определяем интерфейс для нашего бота
import Bot from "@/bot/Bot.js";

export default class DefenderBot extends Bot {
    constructor() {
        super();
    }

    /* 
    Суть бота аналогично довольно проста:
    сначала он пытается сходить королем в любой в угол, чтобы победить.
    Если не получилось, то бот пытается кого-нибудь съесть, далее пробует сходить 
    королем к границе. Потом, аналогично атакующему боту, он пытается поставить фигуру рядом с вражеской.
    Иначе просто как-нибудь ходит.
    */
    makeMove(squares) {
        this.squares = squares
        if (this.tryWin()) {
            return
        }

        if (this.tryEatSomeThing()) {
            return
        }

        if (this.tryMoveKing()) {
            return
        }

        this.tryJustMove()
    }
    
    isMoveLegal(srcToDest) {
        for (let i = 0; i < srcToDest.length; ++i) {
            if (this.squares[srcToDest[i]]) return false;
        }
        return true;
    }

    tryEatSomeThing() {
        for (let i = 0; i < 49; ++i) {
            if (!this.squares[i]) continue

            if (this.squares[i].player === "defender") {
                for (let j = 0; j < 7; ++j) {
                    let pos = i % 7 + j * 7
                    let possible = true
                    if (i === pos || this.squares[pos]) possible = false

                    // проверяем ходы по вертикали, когда защитник наверху
                    if (possible && j < 5 && this.squares[pos + 14] && this.squares[pos + 7] &&
                        this.squares[pos + 14].player === "defender" &&
                        this.squares[pos + 7].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда защитник внизу
                    if (possible && j > 2 && this.squares[pos - 14] && this.squares[pos - 7] &&
                        this.squares[pos - 14].player === "defender" &&
                        this.squares[pos - 7].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда защитник справа
                    if (possible && Math.floor((pos + 2) / 7) === Math.floor(pos / 7) && this.squares[pos + 2] && this.squares[pos + 1] &&
                        this.squares[pos + 2].player === "defender" &&
                        this.squares[pos + 1].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда защитник слева
                    if (possible && Math.floor((pos - 2) / 7) === Math.floor(pos / 7) && this.squares[pos - 2] && this.squares[pos - 1] &&
                        this.squares[pos - 2].player === "defender" &&
                        this.squares[pos - 1].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    pos = Math.floor(i / 7) * 7 + j
                    if (i === pos || this.squares[pos]) continue

                    // проверяем ходы по горизонтали, когда защитник наверху
                    if (pos + 14 <= 48 && this.squares[pos + 14] && this.squares[pos + 7] &&
                        this.squares[pos + 14].player === "defender" &&
                        this.squares[pos + 7].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по горизонтали, когда защитник внизу
                    if (pos - 14 >= 0 && this.squares[pos - 14] && this.squares[pos - 7] &&
                        this.squares[pos - 14].player === "defender" &&
                        this.squares[pos - 7].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по горизонтали, когда защитник справа
                    if (j < 5 && this.squares[pos + 2] && this.squares[pos + 1] &&
                        this.squares[pos + 2].player === "defender" &&
                        this.squares[pos + 1].player === "defender") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по горизонтали, когда защитник слева
                    if (j > 2 && this.squares[pos - 2] && this.squares[pos - 1] &&
                        this.squares[pos - 2].player === "defender" &&
                        this.squares[pos - 1].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }
                }
            }
        }

        return false;
    }

    tryJustMove() {
        for (let i = 0; i < 49; ++i) {
            if (!this.squares[i]) continue

            if (this.squares[i].player === "defender") {
                for (let j = 0; j < 7; ++j) {
                    let pos = i % 7 + j * 7
                    let isDangerous = false
                    let possible = true
                    if (i === pos || this.squares[pos]) possible = false

                    // проверяем опасно ли пойти по вертикали
                    if (possible && Math.floor((pos + 1) / 7) === Math.floor((pos - 1) / 7) && this.squares[pos + 1] &&
                        this.squares[pos - 1] && this.squares[pos + 1].player === "attacker" &&
                        this.squares[pos - 1].player === "attacker") {
                        isDangerous = true
                    }

                    // проверяем ходы по вертикали, когда защитник внизу
                    if (possible && !isDangerous && j > 2 && !this.squares[pos - 14] && this.squares[pos - 7] &&
                        this.squares[pos - 7].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда защитник сверху
                    if (possible && !isDangerous && j < 5 && !this.squares[pos + 14] && this.squares[pos + 7] &&
                        this.squares[pos + 7].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда защитник справа
                    if (possible && !isDangerous && Math.floor(pos / 7) === Math.floor((pos + 2) / 7) && !this.squares[pos + 2] && this.squares[pos + 1] &&
                        this.squares[pos + 1].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда защитник слева
                    if (possible && !isDangerous && Math.floor(pos / 7) === Math.floor((pos - 2) / 7) && !this.squares[pos - 2] && this.squares[pos - 1] &&
                        this.squares[pos - 1].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    pos = Math.floor(i / 7) * 7 + j
                    isDangerous = false
                    if (i === pos || this.squares[pos]) continue

                    // проверяем опасно ли пойти по горизонтали
                    if (pos + 7 <= 48 && pos - 7 >= 0 && this.squares[pos + 7] &&
                        this.squares[pos - 7] && this.squares[pos + 7].player === "attacker" &&
                        this.squares[pos - 7].player === "attacker") {
                        isDangerous = true
                    }

                    // проверяем ходы по горизонтали, когда защитник наверху
                    if (!isDangerous && pos + 14 <= 48 && !this.squares[pos + 14] && this.squares[pos + 7] &&
                        this.squares[pos + 7].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по горизонтали, когда защитник внизу
                    if (!isDangerous && pos - 14 >= 0 && !this.squares[pos - 14] && this.squares[pos - 7] &&
                        this.squares[pos - 7].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по горизонтали, когда защитник справа
                    if (!isDangerous && j < 5 && !this.squares[pos + 2] && this.squares[pos + 1] &&
                        this.squares[pos + 1].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по горизонтали, когда защитник слева
                    if (!isDangerous && j > 2 && !this.squares[pos - 2] && this.squares[pos - 1] &&
                        this.squares[pos - 1].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }
                }
            }
        }

        // вариантов как поставить фигуру рядом с врагом не осталось, поэтому ходим хоть как-то

        for (let i = 0; i < 49; ++i) {
            if (!this.squares[i]) continue

            if (this.squares[i].player === "defender") {
                for (let j = 0; j < 7; ++j) {
                    let pos = i % 7 + j * 7
                    if (i === pos || this.squares[pos]) continue

                    if (this.tryMove(i, pos)) return true;

                    pos = Math.floor(i / 7) * 7 + j
                    if (i === pos || this.squares[pos]) continue

                    if (this.tryMove(i, pos)) return true;
                }
            }
        }

        // катастрофа
        return false;
    }

    tryWin() {
        for (let i = 0; i < 49; ++i) {
            if (this.squares[i] && this.squares[i].isKing()) {
                if (this.tryMove(i, 0)) return true

                if (this.tryMove(i, 6)) return true

                if (this.tryMove(i, 42)) return true

                if (this.tryMove(i, 48)) return true
            }
        }
        
        return false
    }

    tryMoveKing() {
        for (let i = 0; i < 49; ++i) {
            if (!this.squares[i]) continue

            if (this.squares[i].isKing()) {
                for (let j = 0; j < 7; ++j) {
                    let pos = i % 7 + j * 7
                    let isDangerous = false
                    let possible = true
                    if (i === pos || this.squares[pos]) possible = false

                    // проверяем опасно ли пойти по вертикали
                    if (possible && Math.floor((pos + 1) / 7) === Math.floor((pos - 1) / 7) && this.squares[pos + 1] &&
                        this.squares[pos - 1] && this.squares[pos + 1].player === "attacker" &&
                        this.squares[pos - 1].player === "attacker") {
                        isDangerous = true
                    }

                    // проверяем ходы по вертикали, когда защитник внизу
                    if (possible && !isDangerous && j > 2 && !this.squares[pos - 14] && this.squares[pos - 7] &&
                        this.squares[pos - 7].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда защитник сверху
                    if (possible && !isDangerous && j < 5 && !this.squares[pos + 14] && this.squares[pos + 7] &&
                        this.squares[pos + 7].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда защитник справа
                    if (possible && !isDangerous && Math.floor(pos / 7) === Math.floor((pos + 2) / 7) && !this.squares[pos + 2] && this.squares[pos + 1] &&
                        this.squares[pos + 1].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по вертикали, когда защитник слева
                    if (possible && !isDangerous && Math.floor(pos / 7) === Math.floor((pos - 2) / 7) && !this.squares[pos - 2] && this.squares[pos - 1] &&
                        this.squares[pos - 1].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    pos = Math.floor(i / 7) * 7 + j
                    isDangerous = false
                    if (i === pos || this.squares[pos]) continue

                    // проверяем опасно ли пойти по горизонтали
                    if (pos + 7 <= 48 && pos - 7 >= 0 && this.squares[pos + 7] &&
                        this.squares[pos - 7] && this.squares[pos + 7].player === "attacker" &&
                        this.squares[pos - 7].player === "attacker") {
                        isDangerous = true
                    }

                    // проверяем ходы по горизонтали, когда защитник наверху
                    if (!isDangerous && pos + 14 <= 48 && !this.squares[pos + 14] && this.squares[pos + 7] &&
                        this.squares[pos + 7].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по горизонтали, когда защитник внизу
                    if (!isDangerous && pos - 14 >= 0 && !this.squares[pos - 14] && this.squares[pos - 7] &&
                        this.squares[pos - 7].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по горизонтали, когда защитник справа
                    if (!isDangerous && j < 5 && !this.squares[pos + 2] && this.squares[pos + 1] &&
                        this.squares[pos + 1].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }

                    // проверяем ходы по горизонтали, когда защитник слева
                    if (!isDangerous && j > 2 && !this.squares[pos - 2] && this.squares[pos - 1] &&
                        this.squares[pos - 1].player === "attacker") {
                        if (this.tryMove(i, pos)) return true;
                    }
                }
            }
        }

        return false;
    }
}