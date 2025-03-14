import { HIT, MISS } from "./constants";
import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

describe("Gameboard", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });
  describe("placeShip", () => {
    test("places horizontally", () => {
      const ship = new Ship(3);
      gameboard.placeShip(ship, 0, 0, true);
      expect(gameboard.board[0][0]).toBe(ship);
      expect(gameboard.board[1][0]).toBe(ship);
      expect(gameboard.board[2][0]).toBe(ship);
    });

    test("places horizontally at (1, 0)", () => {
      const ship = new Ship(1);
      gameboard.placeShip(ship, 1, 0, true);
      expect(gameboard.board[1][0]).toBe(ship);
    });

    test("places vertically", () => {
      const ship = new Ship(3);
      gameboard.placeShip(ship, 0, 0, false);
      expect(gameboard.board[0][0]).toBe(ship);
      expect(gameboard.board[0][1]).toBe(ship);
      expect(gameboard.board[0][2]).toBe(ship);
    });

    test("places vertically at (0, 1)", () => {
      const ship = new Ship(1);
      gameboard.placeShip(ship, 0, 1, false);
      expect(gameboard.board[0][1]).toBe(ship);
    });

    test("throws error if starting coordinate not in board", () => {
      const ship = new Ship(3);
      expect(() => gameboard.placeShip(ship, 8, 0, true)).toThrow();
      expect(() => gameboard.placeShip(ship, 0, 8, false)).toThrow();
    });
    test("throws error if there is already a ship at that coordinate", () => {
      const ship1 = new Ship(3);
      const ship2 = new Ship(3);
      gameboard.placeShip(ship1, 0, 0, true);
      expect(() => gameboard.placeShip(ship2, 0, 0, false)).toThrow();
    });
  });

  describe("receiveAttack", () => {
    test("hit increases ship's hit and recorded", () => {
      const ship1 = new Ship(3);
      const ship2 = new Ship(3);
      gameboard.placeShip(ship1, 0, 0, true);
      gameboard.placeShip(ship2, 0, 1, false);
      gameboard.receiveAttack(0, 0);
      expect(ship1.hits).toBe(1);
      expect(ship2.hits).toBe(0);
      expect(gameboard.board[0][0]).toBe(HIT);
    });

    test("miss is recorded", () => {
      const ship1 = new Ship(3);
      gameboard.placeShip(ship1, 0, 0, true);
      gameboard.receiveAttack(3, 0);
      expect(ship1.hits).toBe(0);
      expect(gameboard.board[3][0]).toBe(MISS);
    });
  });

  describe("hasAllShipsSunk", () => {
    test("returns true if all ships sunk", () => {
      const ship1 = new Ship(1);
      const ship2 = new Ship(1);
      gameboard.placeShip(ship1, 0, 0, true);
      gameboard.placeShip(ship2, 0, 1, false);
      expect(gameboard.board[0][1]).toBe(ship2);
      gameboard.receiveAttack(0, 0);
      gameboard.receiveAttack(0, 1);
      expect(ship1.isSunk()).toBe(true);
      expect(ship2.isSunk()).toBe(true);
      expect(gameboard.hasAllShipsSunk()).toBe(true);
    });

    test("returns false if no ship sunk", () => {
      const ship1 = new Ship(1);
      const ship2 = new Ship(1);
      gameboard.placeShip(ship1, 0, 0, true);
      gameboard.placeShip(ship2, 0, 1, false);
      expect(gameboard.hasAllShipsSunk()).toBe(false);
    });

    test("returns false if not all ships sunk", () => {
      const ship1 = new Ship(1);
      const ship2 = new Ship(1);
      gameboard.placeShip(ship1, 0, 0, true);
      gameboard.placeShip(ship2, 0, 1, false);
      gameboard.receiveAttack(0, 0);
      expect(gameboard.hasAllShipsSunk()).toBe(false);
    });
  });
  describe("prevHit", () => {
    test("miss if previous was miss", () => {
      const ship1 = new Ship(3);
      gameboard.placeShip(ship1, 0, 0, true);
      gameboard.receiveAttack(3, 0);
      expect(gameboard.prevHit).toBe(MISS);
    });
    test("coordinates if previous was hit", () => {
      const ship1 = new Ship(3);
      gameboard.placeShip(ship1, 0, 0, true);
      gameboard.receiveAttack(0, 0);
      expect(gameboard.prevHit).toEqual({ x: 0, y: 0 });
    });
  });
});
