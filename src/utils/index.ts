import { Index } from "../types.ts";

export function isValidIndex(index: Index) {
  return index.i >= 0 && index.j >= 0 && index.i <= 7 && index.j <= 7;
}

export function includesIndex(arr: Index[], index: Index) {
  for (let i = 0; i < arr.length; i++)
    if (arr[i].i === index.i && arr[i].j === index.j) return true;
  return false;
}

export function getMovement(start: Index, end: Index) {
  return {
    x: end.j - start.j,
    y: end.i - start.i,
  };
}

export function getDistance(start: Index, end: Index) {
  return {
    x: Math.abs(end.j - start.j),
    y: Math.abs(end.i - start.i),
  };
}

export function getDirection(start: Index, end: Index) {
  const movement = getMovement(start, end);
  return {
    x: movement.x === 0 ? 0 : movement.x / Math.abs(movement.x),
    y: movement.y === 0 ? 0 : movement.y / Math.abs(movement.y),
  };
}
