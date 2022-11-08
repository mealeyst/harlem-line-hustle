export function renderWindow() {
  const stage = document.querySelector<HTMLCanvasElement>("#stage")!;
  const ctx: CanvasRenderingContext2D = stage.getContext("2d")!;
  ctx.globalCompositeOperation = "source-over";
  const contentRegion: HTMLElement = document.querySelector(".content")!;
  let { bottom, height, left, right, top, width } =
    contentRegion.getBoundingClientRect();
  const { marginBottom, paddingLeft, paddingRight, marginTop, borderWidth } =
    window.getComputedStyle(contentRegion);
  top = top - parseInt(marginTop, 10);
  bottom = bottom + parseInt(marginBottom, 10);
  const triangleLeftWidth = parseInt(paddingLeft, 10) * 0.75;
  const triangleRightWidth = parseInt(paddingRight, 10) * 0.75;
  const angleTop = parseInt(marginTop, 10) * 0.75;
  const angleLeft = parseInt(marginBottom, 10) * 0.75;
  // Draw dope border using our content region's CSS!
  ctx.beginPath();
  ctx.moveTo(left + parseInt(paddingLeft, 10), top);
  ctx.lineTo(right - Math.ceil(width * 0.25) - 10, top);
  ctx.lineTo(right - Math.ceil(width * 0.25) + 10, top + angleTop);
  ctx.lineTo(right, top + angleTop);
  ctx.lineTo(right, bottom - parseInt(paddingRight, 10));
  ctx.lineTo(right - parseInt(paddingRight, 10), bottom);
  ctx.lineTo(left + angleLeft, bottom);
  ctx.lineTo(left + angleLeft, Math.ceil(height * 0.75) + 10);
  ctx.lineTo(left, Math.ceil(height * 0.75) - 10);
  ctx.lineTo(left, top + parseInt(paddingLeft, 10));
  ctx.closePath();
  ctx.strokeStyle = "hsl(152, 41%, 52%)";
  ctx.lineWidth = parseInt(borderWidth, 10);
  ctx.stroke();
  ctx.fillStyle = "hsla(205, 52%, 6%, 0.8)";
  ctx.fill();
  // Draw dope corner triangles calculated off of padding!
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(left + triangleLeftWidth, top);
  ctx.lineTo(left, top + triangleLeftWidth);
  ctx.closePath();
  ctx.moveTo(right, bottom);
  ctx.lineTo(right - triangleRightWidth, bottom);
  ctx.lineTo(right, bottom - triangleRightWidth);
  ctx.closePath();
  ctx.fillStyle = "hsla(152, 41%, 52%, 0.75)";
  ctx.fill();
}

export function renderStage() {
  const stage = document.querySelector<HTMLCanvasElement>("#stage")!;
  const ctx: CanvasRenderingContext2D = stage.getContext("2d")!;
  const pattern = document.querySelector<HTMLCanvasElement>("#pattern")!;
  pattern.width = 96;
  pattern.height = 86;
  const pctx: CanvasRenderingContext2D = pattern.getContext("2d")!;
  pctx.beginPath();
  pctx.moveTo(48, 15);
  pctx.lineTo(72, 29);
  pctx.lineTo(72, 57);
  pctx.lineTo(48, 71);
  pctx.lineTo(24, 57);
  pctx.lineTo(24, 29);
  pctx.lineTo(48, 15);
  pctx.moveTo(0, 15);
  pctx.lineTo(24, 29);
  pctx.moveTo(0, 71);
  pctx.lineTo(24, 57);
  pctx.moveTo(0, 71);
  pctx.moveTo(48, 15);
  pctx.lineTo(48, 0);
  pctx.moveTo(48, 71);
  pctx.lineTo(48, 86);
  pctx.moveTo(72, 29);
  pctx.lineTo(95, 15);
  pctx.moveTo(72, 57);
  pctx.lineTo(95, 71);
  pctx.moveTo(95, 71);
  pctx.lineTo(95, 86);
  pctx.moveTo(95, 15);
  pctx.lineTo(95, 0);
  pctx.strokeStyle = "hsl(153, 40%, 30%)";
  pctx.shadowBlur = 5;
  pctx.shadowColor = "#FFF";
  pctx.stroke();
  stage.height = window.innerHeight;
  stage.width = window.innerWidth;
  const texture = ctx.createPattern(pattern, "repeat")!;
  ctx.fillStyle = texture;
  ctx.fillRect(0, 0, stage.width, stage.height);
  const gradient = ctx.createLinearGradient(0, 0, 0, stage.height); // Add three color stops

  gradient.addColorStop(0, "hsla(153, 40%, 30%, 0.1)");
  gradient.addColorStop(0.5, "hsla(152, 41%, 52%, 1)");
  gradient.addColorStop(1, "hsla(153, 40%, 30%, 0.1)"); // Set the fill style and draw a rectangle
  ctx.fillStyle = gradient;
  ctx.globalCompositeOperation = "source-in";
  ctx.fillRect(0, 0, stage.width, stage.height);
}

export function renderSpotlight(cx: number, cy: number) {
  const stage = document.querySelector<HTMLCanvasElement>("#stage")!;
  const radius = stage.width / 2;
  const ctx: CanvasRenderingContext2D = stage.getContext("2d")!;
  const alphas = [0.95, 0.9, 0.5, 0.25, 0.1, 0];
  const HSL = [159, 56, 7];
  ctx.save();
  renderStage();
  ctx.globalCompositeOperation = "lighter";

  const radialGradient = ctx.createRadialGradient(cx, cy, 1, cx, cy, radius);

  const len = alphas.length - 1;
  alphas.forEach((a, i) => {
    radialGradient.addColorStop(
      i / len,
      `hsla(${HSL[0]},${HSL[1]}%,${HSL[2]}%,${a})`
    );
  });

  ctx.beginPath();

  ctx.arc(cx, cy, radius, 0, Math.PI * 2, false);
  ctx.fillStyle = radialGradient;
  ctx.fill();
  ctx.stroke;
}
