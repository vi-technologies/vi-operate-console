export function createHexagon(x: number, y: number, radius: number) {
  const angle = Math.PI / 3;
  let path = '';
  for (let i = 0; i < 6; i++) {
    const theta = angle * i;
    const px = x + radius * Math.cos(theta);
    const py = y + radius * Math.sin(theta);
    path += (i === 0 ? `M ${px} ${py}` : ` L ${px} ${py}`);
  }
  path += ' Z';
  return { frontFace: path };
}
