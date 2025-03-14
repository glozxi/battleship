import { BLUE, GREY, HIT, MISS, RED } from "./constants";
import { Logic } from "./logic";

export class Display {
  logic = new Logic();

  startGame() {
    this.logic.createGame();
    this.renderBoards();
  }

  #renderBoard(player, div) {
    for (let i = 0; i < player.gameboard.length; i++) {
      for (let j = 0; j < player.gameboard.length; j++) {
        const coordinates = player.gameboard.board[i][j];
        const newDiv = document.createElement("div");
        newDiv.dataset.x = i;
        newDiv.dataset.y = j;
        if (coordinates === MISS) {
          newDiv.classList.add(GREY);
        } else if (coordinates === HIT) {
          newDiv.classList.add(RED);
        } else if (player === this.logic.player1 && coordinates !== null) {
          newDiv.classList.add(BLUE);
        }

        if (player === this.logic.player2)
          if (coordinates !== MISS && coordinates !== HIT) {
            newDiv.onclick = (e) => {
              let winner = this.logic.getWinner();
              if (winner) {
                return;
              }
              this.logic.doRound(e.target.dataset.x, e.target.dataset.y);
              winner = this.logic.getWinner();
              if (winner) {
                this.renderWinner(winner);
              }
              this.renderBoards();
            };
          }

        div.appendChild(newDiv);
      }
    }
  }

  renderBoards() {
    const player1 = this.logic.player1;
    const player2 = this.logic.player2;
    const player1Board = document.querySelector("#player1");
    const player2Board = document.querySelector("#player2");
    player1Board.innerHTML = "";
    player2Board.innerHTML = "";
    this.#renderBoard(player1, player1Board);
    this.#renderBoard(player2, player2Board);
    const btn = document.querySelector("button");
    btn.onclick = () => {
      this.startGame();
    };
  }

  renderWinner(winner) {
    const winnerDiv = document.querySelector(".winner");
    if (winner !== null) {
      winnerDiv.textContent = winner + " wins!";
    }
  }
}
