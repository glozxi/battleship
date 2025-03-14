import { Gameboard } from "./gameboard";
import { Ship } from "./ship";
import { calculateRandomCoordinates, randomTrueOrFalse } from "./utils";

export class Player {
  gameboard = new Gameboard();
  constructor(isComputer) {
    this.isComputer = isComputer;
  }

  placeShips(shipLengths) {
    let success = false;
    let coordinates;
    let isHorizontal;
    let fail = 0;
    let pass = 0;
    for (let length of shipLengths) {
      success = false;
      do {
        try {
          coordinates = calculateRandomCoordinates(
            0,
            this.gameboard.length - 1,
          );
          isHorizontal = randomTrueOrFalse();
          this.gameboard.placeShip(
            new Ship(length),
            coordinates.x,
            coordinates.y,
            isHorizontal,
          );
          success = true;
        } catch (error) {}
      } while (!success);
    }
  }
}
