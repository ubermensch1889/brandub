import Attacker from "./pieces/Attacker.js";
import Defender from "./pieces/Defender.js";
import King from "./pieces/King.js";

export default function initialiseBoard(){
    const squares = Array(49).fill(null);
    
    squares[3] = new Attacker();
    squares[10] = new Attacker();
    squares[38] = new Attacker();
    squares[45] = new Attacker();

    squares[21] = new Attacker();
    squares[22] = new Attacker();
    squares[26] = new Attacker();
    squares[27] = new Attacker();

    squares[17] = new Defender();
    squares[31] = new Defender();
    squares[23] = new Defender();
    squares[25] = new Defender();

    squares[24] = new King();

    return squares;
}