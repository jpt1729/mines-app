function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

function nCr(n, r) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

export function calculateMultiplier(mines, diamonds, size) {
  const houseEdge = 0.05;
  return ((1 - houseEdge) * nCr(size**2, diamonds)) / nCr(size**2 - mines, diamonds);
}
export function formatRoundedDown(number) {
    // Multiply by 100, use Math.floor to round down, then divide by 100
    let roundedNumber = Math.floor(number * 100) / 100;
    // Convert to string and ensure 2 decimal places
    return roundedNumber.toFixed(2);
}