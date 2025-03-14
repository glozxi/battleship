import { Player } from "./player";

test("place ships do not overlap", () => {
  const player = new Player(false);
  const shipLengths = [3, 2, 1];
  player.placeShips(shipLengths);
  expect(
    player.gameboard.board.reduce((sum, row) => {
      return (
        sum +
        row.reduce(
          (rowSum, element) => (element !== null ? rowSum + 1 : rowSum),
          0,
        )
      );
    }, 0),
  ).toEqual(shipLengths.reduce((sum, length) => sum + length, 0));
});
