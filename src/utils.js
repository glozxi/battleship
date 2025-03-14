export function calculateRandomCoordinates(min, max) {
  return {
    x: Math.floor(Math.random() * (max - min + 1) + min),
    y: Math.floor(Math.random() * (max - min + 1) + min),
  };
}

export function randomTrueOrFalse() {
  const num = Math.floor(Math.random() * 2);
  return num === 1;
}
