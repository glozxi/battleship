import { calculateRandomCoordinates } from "./utils"

describe("calculateRandomCoordinates", () => {
  test("result is in range", () => {
    const coordinates = calculateRandomCoordinates(0, 9);
    expect(coordinates.x).toBeGreaterThanOrEqual(0);
    expect(coordinates.y).toBeGreaterThanOrEqual(0);
    expect(coordinates.x).toBeLessThanOrEqual(10);
    expect(coordinates.y).toBeLessThanOrEqual(10);
  })
})