function getRandomGradientImage(width = 400, height = 400) {
  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;

  const color1 = getRandomColor();
  const color2 = getRandomColor();

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  const angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle) * width;
  const y = Math.sin(angle) * height;

  const gradient = ctx.createLinearGradient(0, 0, x, y);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL();
}

export default  getRandomGradientImage;