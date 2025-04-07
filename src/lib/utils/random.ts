/**
 * Creates a deterministic random number generator based on a seed value
 * @param seed Initial seed value
 * @returns Function that generates random numbers between 0 and 1
 */
export function seededRandom(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}
