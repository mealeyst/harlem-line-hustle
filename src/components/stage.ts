import gsap from "gsap";

type DrawingCoordinates = Record<string, { x: number; y: number }>;
export function contentRegion(inOpen = false) {
  let isOpen = inOpen;
  const stage = document.querySelector<HTMLCanvasElement>("#stage")!;
  const ctx: CanvasRenderingContext2D = stage.getContext("2d")!;
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
  const center = {
    x: width / 2 + left,
    y: height / 2 + top,
  };
  const startingCoordinates: DrawingCoordinates = {
    point01: { x: center.x - 3.5, y: center.y - 10 },
    point02: { x: center.x + 3.5, y: center.y - 10 },
    point03: { x: center.x + 9, y: center.y - 8 },
    point04: { x: center.x + 10, y: center.y },
    point05: { x: center.x + 9, y: center.y + 8 },
    point06: { x: center.x + 3.5, y: center.y + 10 },
    point07: { x: center.x - 3.5, y: center.y + 10 },
    point08: { x: center.x - 9, y: center.y + 8 },
    point09: { x: center.x - 10, y: center.y },
    point10: { x: center.x - 9, y: center.y - 8 },
  };
  const endingCoordinates: DrawingCoordinates = {
    point01: { x: left + parseInt(paddingLeft, 10), y: top },
    point02: { x: right - Math.ceil(width * 0.25) - 10, y: top },
    point03: { x: right - Math.ceil(width * 0.25) + 10, y: top + angleTop },
    point04: { x: right, y: top + angleTop },
    point05: { x: right, y: bottom - parseInt(paddingRight, 10) },
    point06: { x: right - parseInt(paddingRight, 10), y: bottom },
    point07: { x: left + angleLeft, y: bottom },
    point08: { x: left + angleLeft, y: Math.ceil(height * 0.75) + 10 },
    point09: { x: left, y: Math.ceil(height * 0.75) - 10 },
    point10: { x: left, y: top + parseInt(paddingLeft, 10) },
  };
  let contentCoordinates: DrawingCoordinates = isOpen
    ? endingCoordinates
    : startingCoordinates;
  function open() {
    Object.keys(contentCoordinates).forEach((key) => {
      const coordinate = contentCoordinates[key];
      const { x: toX, y: toY } = endingCoordinates[key];
      const tl = gsap.timeline();
      tl.to(coordinate, {
        x: toX,
        y: toY,
        duration: 0.75,
        onUpdate: () => {
          renderStage();
          render();
        },
        onComplete: () => (isOpen = true),
      });
      tl.to(".page", { opacity: 1, duration: 1 });
    });
  }
  function close() {
    Object.keys(contentCoordinates).forEach((key) => {
      const coordinate = contentCoordinates[key];
      const { x: toX, y: toY } = startingCoordinates[key];
      const tl = gsap.timeline();
      tl.to(".page", { opacity: 0, duration: 1 });
      tl.to(coordinate, {
        x: toX,
        y: toY,
        duration: 0.75,
        onUpdate: () => {
          console.log("Updating");
          renderStage();
          render();
        },
      });
    });
  }
  function navigate(element: Element) {
    contentCoordinates = endingCoordinates;
    Object.keys(contentCoordinates).forEach((key) => {
      const coordinate = contentCoordinates[key];
      const { x: closeX, y: closeY } = startingCoordinates[key];
      const { x: openX, y: openY } = endingCoordinates[key];

      const tl = gsap.timeline();
      isOpen = true;
      tl.to(".page", { opacity: 0, duration: 1 });
      tl.to(coordinate, {
        x: closeX,
        y: closeY,
        duration: 0.75,
        onStart: () => (isOpen = true),
        onUpdate: () => {
          renderStage();
          render();
        },
        onComplete: () => (isOpen = false),
      });
      tl.to(coordinate, {
        x: openX,
        y: openY,
        duration: 0.75,
        onUpdate: () => {
          renderStage();
          render();
        },
        onComplete: () => (isOpen = true),
      });
      tl.to(".page", {
        opacity: 1,
        duration: 1,
        onStart: () => {
          element.scrollIntoView();
        },
      });
    });
  }
  const render = () => {
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    // Draw dope border using our content region's CSS!
    Object.keys(contentCoordinates).forEach((key, index) => {
      const { x, y } = contentCoordinates[key];
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.strokeStyle = "hsl(152, 41%, 52%)";
    ctx.lineWidth = parseInt(borderWidth, 10);
    ctx.stroke();
    ctx.fillStyle = "hsla(205, 52%, 6%, 0.8)";
    ctx.fill();
    ctx.beginPath();
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
  };
  return {
    close,
    open,
    navigate,
    render,
  };
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
  ctx.closePath();
  ctx.fillStyle = radialGradient;
  ctx.fill();
  contentRegion(true).render();
}
