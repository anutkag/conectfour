class Player{
constructor (color){
    this.color=color
}
} 


class Game {
  constructor(width, height) {
    this.WIDTH = width;
    this.HEIGHT = height;
    this.currPlayer = {}; // active player: 1 or 2
    this.board = []; // array of rows, each row is array of cells  (board[y][x])
    this.winner=null
    this.makeBoard();
    this.makeHtmlBoard();
    this.generatePlayer()
  }
  generatePlayer(){
    let player1Color=document.querySelector("#user1").value || "red";
    let player2Color=document.querySelector("#user2").value || "blue";
    this.firstPlayer=new Player(player1Color)
    this.secondPlayer=new Player(player2Color)
    this.currPlayer=this.secondPlayer
    console.log (this.currPlayer)
  }
  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }
  makeHtmlBoard() {
    const board = document.getElementById("board");
    board.innerHTML=""

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click",(event)=> this.handleClick(event));

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }
  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }
  placeInTable(y, x) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
//    piece.classList.add(`p${this.currPlayer}`);
piece.style.backgroundColor=this.currPlayer.color
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }
  endGame(msg) {
    alert(msg);
  }
  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }
if (this.winner==null){
    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);
}
    // check for win
    if (this.checkForWin()) {
        this.winner=this.currPlayer
      return this.endGame(`Player ${this.currPlayer.color} won!`);
    }

    // check for tie
    if (this.board.every((row) => row.every((cell) => cell))) {
        this.winner=false
      return this.endGame("Tie!");
    }

    // switch players
    // this.currPlayer = this.currPlayer === 1 ? 2 : 1;
    if (this.currPlayer == this.firstPlayer) {
      this.currPlayer = this.secondPlayer;
    } else if (this.currPlayer == this.secondPlayer) {
      this.currPlayer = this.firstPlayer;
    }
  }
 _win(cells) {
    return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    }
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
  checkForWin() {
   

      

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];

        // find winner (only checking each win-possibility as needed)
        if (this._win(horiz) || this._win(vert) || this._win(diagDR) || this._win(diagDL)) {
          return true;
        }
      }
    }
  }
}
let button=document.querySelector("#start")
button.onclick=function(){
    new Game(6, 7);  
}

