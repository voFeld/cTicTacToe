// TODO
// Create a Player class that has one attribute, `name`.

var Player = function(name){
  this.name = name;
};

// TicTacToe class is the main class of the game. The constructor should take
// two arguments, the two names of the players.
var TicTacToe = function (player1, player2) {
  this.player1 = new Player(player1);
  this.player2 = new Player(player2);

  this.reset();
};

// TODO
// Reset the game with a new board and player 1 as the current player.
TicTacToe.prototype.reset = function () {
  this.currentPlayer = this.player1.name;
  this.board = new Board();
};



// At this point, you should scroll down and implement
// TicTacToe.prototype.print, which prints the state of the board. This will be
// necessary to play the game and to debug our program as we write it!
//

// Print the board and the current player's name.
TicTacToe.prototype.print = function (x, y, pos, char) {
  this.board.print(x, y, pos, char);
  // console.log('It\'s ' + this.currentPlayer + '\'s turn!');
}


// TODO
// Switch this.currentPlayer to the other player.
TicTacToe.prototype.switchCurrentPlayer = function () {
  if (this.currentPlayer === this.player1.name) {
    this.currentPlayer = this.player2.name;
  } else {
    this.currentPlayer = this.player1.name;
  }
};

// game = new TicTacToe("John", "Mary");
// game.print()
//
// 123
// 456
// 789
// It's John's turn!
//
// game.switchCurrentPlayer();
// game.print()
//
// 123
// 456
// 789
// It's Mary's turn!

// TODO
// Should return "X" if the current turn is player 1's. Return "O" otherwise.
TicTacToe.prototype.currentChar = function () {
  if (this.currentPlayer === this.player1.name) {
    return 'X';
  } else {
    return 'O';
  }
};

// game = new TicTacToe("John", "Mary");
// game.currentChar();
// X
// game.switchCurrentPlayer();
// game.currentChar();
// O
// game.switchCurrentPlayer();
// game.currentChar();
// X

// TODO
// Play a turn. Takes a position as input and play that position for the current
// player.
//
// If the game is already over, it's an invalid move. Print out "Game is over."
//
// If, after the turn is played, there is a winner, print out the player's name
// as winner.
//
// If the game is now tied, print this out.
//
TicTacToe.prototype.play = function (rowLength, cellLength, xPos, yPos) {

  // TODO, using the functions you implemented above:
  // - Check if the game is over. Return if it is.
  // - Play the given position.
  // - Check for a winner after position is played.
  // - Switch the current player to the next one.
  // - Print the state of the board and next person's turn.
  var position = this.board.draw(rowLength, cellLength, xPos, yPos);
  var winner = this.board.winner();

  if (winner === 'X' || winner === 'O' || winner === 'tie') {
    if (winner === 'X') {
      $('.winner').html('Wow, ' + this.player1.name + ' is won');
    } else {
      if (winner === 'O') {
        $('.winner').html('Wow, ' + this.player1.name + ' is won');
      } else {
        $('.winner').html('You have a tie');
      }
    }
    return;
  } else {
    this.board.play(this.currentChar(), position);
    console.log(this.currentChar());
    this.print(xPos, yPos, position, this.currentChar());
    this.switchCurrentPlayer();
  }
};


// The Board class holds the state of the board. To make it simple, the starting
// state is the positions 1 to 9.
var Board = function () {
  this.board = [["1", "2", "3"],
                ["4", "5", "6"],
                ["7", "8", "9"]];
};

Board.prototype.draw = function (rowLength, cellLength, xPos, yPos) {
  var position = this.board[yPos][xPos];
  // console.log(position);
  return position;
};

Board.prototype.print = function (x, y, pos, char) {
  // for(var i = 0; i < this.board.length; i++) {
  //    console.log(this.board[i]);
  // }
  console.log(char);
  this.board[y][x] = char;
  $('td').eq(pos-1).html(char);
};

//
// Given a character ("X" or "O") and position 1 to 9, set board to new state.
// Print out warning messages for invalid characters, positions, and
// already-played positions.
Board.prototype.play = function (char, position) {
  if (char !== "X" && char != "O") {
    console.log("Invalid character. Try again.");
    return;
  }

  if (position < 1 || position > 9) {
    console.log("Positions must be from 1 to 9. Try again.");
    return;
  }

  var row = Math.floor((position - 1) / 3);
  var col = (position - 1) % 3;

  var currentChar = this.board[row][col];
  if (currentChar === "X" || currentChar === "O") {
    console.log("Position has already been played. Try again.");
    return;
  }

  this.board[row][col] = char;

  return;
};



// Returns "X" or "O" if one of the players have won.
// Returns "tie" if the game is done with no winner.
// Return undefined if the game is still in progress.
Board.prototype.winner = function () {
  var playerChars = ["X", "O"];
  var numTurns = 0;

  for (var numPlayers = 0; numPlayers < 2; numPlayers++) {
    var char = playerChars[numPlayers];

    // Check if player won horizontally or vertically
    for (var r = 0; r < 3; r++) {
      var horizontalCount = 0;
      var verticalCount = 0;

      for (var c = 0; c < 3; c++) {

        if (this.board[r][c] == char) {
          horizontalCount += 1;
          numTurns += 1;
        }

        if (this.board[c][r] == char) {
          verticalCount += 1;
        }
      }

      if (horizontalCount == 3 || verticalCount == 3) {
        return char;
      }
    }

    // Check if players won diagonally
    var count1 = 0;
    var count2 = 0;
    for (var i = 0; i < 3; i++) {
      if (this.board[i][i] == char) {
        count1 += 1
      }

      if (this.board[i][2-i] === char) {
        count2 += 1
      }
    }
    if (count1 == 3 || count2 === 3) {
      return char;
    }
  }

  if (numTurns == 9) {
    return "tie";
  } else {
    return;
  }
};


var game = new TicTacToe('First Player', 'Second Player');
$('tr').on('click', function (e) {
  var row = Array.prototype.slice.apply($('tr'));
  var cell = Array.prototype.slice.apply($('td'));
  // console.log(cell.length, row.length, $(e.currentTarget).index(), $(e.target).index());
  game.play(row.length, cell.length, $(e.target).index(), $(e.currentTarget).index());
});