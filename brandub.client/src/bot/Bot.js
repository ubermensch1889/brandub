// определяем интерфейс для нашего бота
export default class Bot {
    constructor(squares) {
        if (this.constructor === Bot) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    
    makeMove() {
        throw new Error("Method 'makeMove()' must be implemented.");
    }
}