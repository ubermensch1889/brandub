// определяем интерфейс для нашего бота
export default class Bot {
    constructor() {
        if (this.constructor === Bot) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        
        this.squares = null
    }
    
    makeMove() {
        throw new Error("Method 'makeMove()' must be implemented.");
    }

    isMoveLegal(srcToDest) {
        for (let i = 0; i < srcToDest.length; ++i) {
            if (this.squares[srcToDest[i]]) return false;
        }
        return true;
    }

    tryMove(src, dest) {
        const srcToDestPath = this.squares[src].getSrcToDestPath(src, dest)
        const isMoveLegal = this.isMoveLegal(srcToDestPath);
        const isMovePossible = this.squares[src].isMovePossible(src, dest)

        if (!isMoveLegal || !isMovePossible) return false

        this.squares[dest] = this.squares[src]
        this.squares[src] = null;
        return true;
    }
}