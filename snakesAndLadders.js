/* 
5 kyu - https://www.codewars.com/kata/587136ba2eefcb92a9000027/train/javascript

Your task is to make a simple class called SnakesLadders. The test cases will call the method play(die1, die2) independantly of the state of the game or the player turn. The variables die1 and die2 are the die thrown in a turn and are both integers between 1 and 6. The player will move the sum of die1 and die2.

1.  There are two players and both start off the board on square 0.

2.  Player 1 starts and alternates with player 2.

3.  You follow the numbers up the board in order 1=>100

4.  If the value of both die are the same then that player will have another go.

5.  Climb up ladders. The ladders on the game board allow you to move upwards and get ahead faster. If you land exactly on a square that shows an image of the bottom of a ladder, then you may move the player all the way up to the square at the top of the ladder. (even if you roll a double).

6.  Slide down snakes. Snakes move you back on the board because you have to slide down them. If you land exactly at the top of a snake, slide move the player all the way to the square at the bottom of the snake or chute. (even if you roll a double).

7.  Land exactly on the last square to win. The first person to reach the highest square on the board wins. But there's a twist! If you roll too high, your player "bounces" off the last square and moves back. You can only win by rolling the exact number needed to land on the last square. For example, if you are on square 98 and roll a five, move your game piece to 100 (two moves), then "bounce" back to 99, 98, 97 (three, four then five moves.)

8.  If the Player rolled a double and lands on the finish square “100” without any remaining moves then the Player wins the game and does not have to roll again.

======

Return Player n Wins!. Where n is winning player that has landed on square 100 without any remainding moves left.

Return Game over! if a player has won and another player tries to play.

Otherwise return Player n is on square x. Where n is the current player and x is the sqaure they are currently on.
*/

// ================================ IGNORE BELOW THIS ================================
// I like run debug and run code on my terminal with nodemon, this is so I know what line a log is ran from;
const origLog = console.log;
console.log = function (...args) {
  const err = new Error();
  const stackLine = err.stack.split("\n")[2]; // the caller
  const match = stackLine.match(/\((.*):(\d+):(\d+)\)/);
  if (match) {
    const [, file, line, col] = match;
    origLog(`[${line}:${col}]`, ...args);
  } else {
    origLog(...args);
  }
};
// ================================ IGNORE ABOVE THIS ================================

class SnakesLadders {
  static ladderPos = {
    2: 38,
    7: 14,
    8: 31,
    15: 26,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    78: 98,
    87: 94,
  };
  static snakePos = {
    16: 6,
    46: 25,
    49: 11,
    62: 19,
    64: 60,
    74: 53,
    89: 68,
    92: 88,
    95: 75,
    99: 80,
  };
  constructor() {
    // all constants and also all variables that we need to keep the state of
    this.playerPos = { 1: 0, 2: 0 };
    this.playerTurn = 1;
    this.isGameOver = false;
  }

  play(die1, die2) {
    // while isGameOver is false, player rolls the dice, move spaces, and switches turns
    while (!this.isGameOver) {
      let roll = die1 + die2;
      let currPlayer = this.playerTurn;
      this.playerPos[this.playerTurn] += roll; // add to position of curr player

      // assign playerPos after check
      let position = this.playerMoveCheck();

      // if position is exactly 100, return winner and set isGameOver to true
      if (position === 100) {
        this.isGameOver = true;
        return `Player ${this.playerTurn} Wins!`;
      }

      if (die1 === die2) {
        // if both die were the same number roll, keep the playerTurn for next play
        this.playerTurn = this.playerTurn === 1 ? 1 : 2;
      } else {
        //else, switch player turn after every play call
        this.playerTurn = this.playerTurn === 1 ? 2 : 1;
      }

      // no game winner and game is not over, return the current player and current position
      return `Player ${currPlayer} is on square ${position}`;
    }
    // winner found, game is over - block from game
    return "Game over!";
  }
  // checks if the current playerPos is on a snake or a ladder
  playerMoveCheck() {
    // creates a copy of the current square (playerPos) that playerTurn is on since it's a prim value
    let currentSquare = this.playerPos[this.playerTurn];

    // if the currentSquare is greater than 100, move back the by the amount of remainder spaces
    if (currentSquare > 100) {
      currentSquare = 100 - (currentSquare % 100);
    }

    // if either snakePos or ladderPos keys are matched by currentSquare value...
    while (
      SnakesLadders.snakePos?.[currentSquare] ||
      SnakesLadders.ladderPos?.[currentSquare]
    ) {
      if (SnakesLadders.snakePos?.[currentSquare]) {
        // ...assign it the values of those keys to currentSquare
        currentSquare = SnakesLadders.snakePos[currentSquare];
      } else {
        currentSquare = SnakesLadders.ladderPos[currentSquare];
      }
    }

    // assign the value of currentSquare to playerPos of playerTurn
    return (this.playerPos[this.playerTurn] = currentSquare);
  }
}

const game1 = new SnakesLadders();
game1.play(1, 1); // Player 1 - hits a ladder at 2, moves to 38
game1.play(1, 5); // Player 1 again - since he die were equal, moves to 44
game1.play(6, 2); // Player 2 - moves to 31
game1.play(1, 1); // Player 1 - hits a snake at 46, slides down to 25
