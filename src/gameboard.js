import { HIT, MISS } from "./constants";

export class Gameboard {
  length = 10;
  board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  #ships = [];

  prevHit = null;

  #canPlaceShip(ship, x, y, isHorizontal) {
    const length = ship.length;
    if (isHorizontal) {
      for (let i = x; i < x + length; i++) {
        if (this.board[i][y] !== null) {
          return false;
        }
      }
    } else {
      for (let i = y; i < y + length; i++) {
        if (this.board[x][i] !== null) {
          return false;
        }
      }
    }
    return true;
  }

  placeShip(ship, x, y, isHorizontal = true) {
    const length = ship.length;
    if (!this.#canPlaceShip(ship, x, y, isHorizontal)) {
      throw Error("already a ship here");
    }
    if (isHorizontal) {
      if (x + length > this.length) {
        throw Error("x-coordinate too big");
      }
      for (let i = x; i < x + length; i++) {
        this.board[i][y] = ship;
      }
    } else {
      if (y + length > this.length) {
        throw Error("y-coordinate too big");
      }
      for (let i = y; i < y + length; i++) {
        this.board[x][i] = ship;
      }
    }
    this.#ships.push(ship);
  }

  receiveAttack(x, y) {
    if (this.board[x][y] === null) {
      this.board[x][y] = MISS;
      this.prevHit = MISS;
    } else {
      this.board[x][y].hit();
      this.board[x][y] = HIT;
      this.prevHit = { x: x, y: y };
    }
  }

  hasAllShipsSunk() {
    for (let ship of this.#ships) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }
}
