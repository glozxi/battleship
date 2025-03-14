import { Logic } from "./logic";

describe("Logic", () => {
  let logic;
  beforeEach(() => {
    logic = new Logic();
  });
  describe("createGame", () => {
    test("creates players", () => {
      logic.createGame();
      expect(logic.player1).not.toBeNull();
      expect(logic.player2).not.toBeNull();
    });
  });

  describe("do round", () => {
    beforeEach(() => {
      logic.createGame();
    });
    test("both players get hit once", () => {
      const spy1 = jest.spyOn(logic.player1.gameboard, "receiveAttack");
      const spy2 = jest.spyOn(logic.player2.gameboard, "receiveAttack");
      logic.doRound(0, 0);
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy2).toHaveBeenCalledTimes(1);
    });
  });
});
