import { HIT, MISS } from "./constants";
import { Player } from "./player";
import { shipLengths } from "./shipLengths";
import { calculateRandomCoordinates } from "./utils";

export class Logic {
  #createPlayers() {
    this.player1 = new Player(false);
    this.player2 = new Player(true);
  }

  createGame() {
    this.#createPlayers();
    this.player1.placeShips(shipLengths);
    this.player2.placeShips(shipLengths);
  }

  doRound(x, y) {
    this.#hit(this.player2, x, y);
    const coordinates = this.#getPlayer1CoordinatesToHit();
    this.#hit(this.player1, coordinates.x, coordinates.y);
  }

  #getPlayer1CoordinatesToHit() {
    const prevHit = this.player1.gameboard.prevHit;
    let toHit;
    if (prevHit !== MISS && prevHit !== null) {
      toHit = { x: prevHit.x - 1, y: prevHit.y };
      if (this.#isCoordinatesHittable(toHit, this.player1)) {
        return toHit;
      }
      toHit = { x: prevHit.x + 1, y: prevHit.y };
      if (this.#isCoordinatesHittable(toHit, this.player1)) {
        return toHit;
      }
      toHit = { x: prevHit.x, y: prevHit.y - 1 };
      if (this.#isCoordinatesHittable(toHit, this.player1)) {
        return toHit;
      }
      toHit = { x: prevHit.x, y: prevHit.y + 1 };
      if (this.#isCoordinatesHittable(toHit, this.player1)) {
        return toHit;
      }
    }
    return this.#getPlayer1UnhitCoordinates();
  }

  #isCoordinatesHittable(coordinates, player) {
    const inBoard =
      coordinates.x >= 0 &&
      coordinates.x <= 9 &&
      coordinates.y >= 0 &&
      coordinates.y <= 9;
    if (!inBoard) {
      return false;
    }
    const elementInBoard = player.gameboard.board[coordinates.x][coordinates.y];
    const isFree = elementInBoard !== HIT && elementInBoard !== MISS;
    return isFree;
  }

  #getPlayer1UnhitCoordinates() {
    let coordinates;
    do {
      coordinates = calculateRandomCoordinates(0, 9);
    } while (!this.#isCoordinatesHittable(coordinates, this.player1));
    return coordinates;
  }

  #hit(targetPlayer, x, y) {
    targetPlayer.gameboard.receiveAttack(x, y);
  }

  #hasPlayerWon(player) {
    if (player === this.player1 && this.player2.gameboard.hasAllShipsSunk()) {
      return true;
    }
    if (player === this.player2 && this.player1.gameboard.hasAllShipsSunk()) {
      return true;
    }
    return false;
  }

  getWinner() {
    if (this.#hasPlayerWon(this.player1)) {
      return "Player 1";
    }
    if (this.#hasPlayerWon(this.player2)) {
      return "Player 2";
    }
    return null;
  }
}
