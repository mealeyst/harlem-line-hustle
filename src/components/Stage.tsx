import debounce from "lodash/debounce";
import { useContext, useEffect, useRef } from "react";
import styled, { ThemeContext } from "styled-components";
import { fixedScreen } from "../theme/fixedScreen";
import { color } from "../theme/color"
import { parseInt } from "lodash";
import ErrorContext from "../contexts/ErrorContext";

function getColorStr(h1: number, s1: number, l1: number, h2: number, s2: number, l2: number, pct: number) {
  var hn = Math.round((1-pct) * h1 + pct * h2),
      sn = Math.round((1-pct) * s1 + pct * s2),
      ln = Math.round((1-pct) * l1 + pct * l2);
  return `hsl(${hn},${sn}%,${ln}%)`
}

export interface Points {
  x1: number
  x2: number
  y1: number
  y2: number
}

export const Stage = styled(({className}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const patternRef = useRef<HTMLCanvasElement>(null)
  const theme = useContext(ThemeContext)
  const { error } = useContext(ErrorContext)
  useEffect(() => {
    const canvas = canvasRef.current
    const pattern = patternRef.current
    if (canvas && pattern) {
      let posX = 100;
      let posY = 100;

      const mouse = (event: MouseEvent) => {
        posX = event.clientX;
        posY = event.clientY;
      }
      if(window.matchMedia("(pointer: fine)").matches) {
        document.body.addEventListener('mousemove', mouse);
      }
      // define the gradient
      const cirRadius = 1000;
      const getHslValues = (color: string) => /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(color)
      let hslValues = [
        getHslValues(theme.colors.primary["500"]),
        getHslValues(theme.colors.red["500"]),
      ] as RegExpExecArray[]
      const RGB = [255,255,255] ; // black any values from 0 to 255
      // const alphas = [0,0,0.2,0.5,0.9,0.95]; // zero is transparent one is not
      const alphas = [0.95, 0.9, 0.5, 0.2, 0, 0]
      let cycleLength = 1;
      let cyclePct = 0;
      let lastTs = Date.now();
      let reverse = false
      const draw = () => {
        const now = Date.now();
        const dt = (now - lastTs)/500; //seconds
        if (!reverse) {
          cyclePct += dt/cycleLength;
        }
        if (reverse) {
          cyclePct -= dt/cycleLength;
        }
        if (cyclePct >= 1 && !reverse) {
          reverse = true
        }
        if (cyclePct <= 0 && reverse) {
          reverse = false
        }
        lastTs = now;
        const color = getColorStr(
          parseInt(hslValues[0][1]),
          parseInt(hslValues[0][2]),
          parseInt(hslValues[0][3]),
          parseInt(hslValues[1][1]),
          parseInt(hslValues[1][2]),
          parseInt(hslValues[1][3]),
          cyclePct
        )
        const stageHeight = Math.floor(window.innerHeight * 0.95);
        const stageWidth = Math.floor(window.innerWidth * 0.95);
        canvas.width = stageWidth;
        canvas.height = stageHeight;
        const ctx = canvas.getContext('2d');
        const gridSize = stageWidth > stageHeight ? stageWidth * 0.05 : stageHeight * 0.05;
        pattern.height = gridSize;
        pattern.width = gridSize;
        const patternCtx = pattern.getContext("2d");

        if (patternCtx) {
          patternCtx.fillStyle = theme.colors.primary[900];;
          patternCtx.fillRect(0, 0, gridSize, gridSize);
          patternCtx.moveTo(gridSize / 2, 0);
          patternCtx.lineTo(0, gridSize / 2);
          patternCtx.lineTo(gridSize / 2, gridSize);
          patternCtx.lineTo(gridSize, gridSize / 2);
          patternCtx.lineTo(gridSize / 2, 0);
          patternCtx.strokeStyle = (error) ? color : theme.colors.primary["500"];
          patternCtx.lineWidth = 1;
          patternCtx.shadowBlur = 4;
          patternCtx.shadowColor = theme.colors.primary["600"];
          patternCtx.stroke();
        }


        if (ctx) {
          const texture = ctx.createPattern(pattern, "repeat") as CanvasPattern;
          ctx.fillStyle = texture;
          ctx.fillRect(0, 0, stageWidth, stageHeight);

          if(window.matchMedia("(pointer: fine)").matches) {
              ctx.globalCompositeOperation = 'overlay';
              // create gradient
            var grad = ctx.createRadialGradient(posX,posY,0,posX,posY,cirRadius);
            // add colour stops
            var len = alphas.length-1;
            alphas.forEach((a,i) => {
                grad.addColorStop(i/len,`rgba(${RGB[0]},${RGB[1]},${RGB[2]},${a})`);
            });
            // set fill style to gradient
            ctx.fillStyle = grad;
            // render that gradient
            ctx.fillRect(0,0,canvas.width,canvas.height);
          }
          var gradient = ctx.createLinearGradient(0, 0, 0, stageHeight); // Add three color stops

          gradient.addColorStop(0, "rgba(0,0,0, 0)");
          gradient.addColorStop(0.5, "rgba(8, 18, 25, 0.80)");
          gradient.addColorStop(1, "rgba(0,0,0, 0)"); // Set the fill style and draw a rectangle
          ctx.fillStyle = gradient;
          ctx.globalCompositeOperation = 'multiply';
          ctx.fillRect(0, 0, stageWidth, stageHeight);
          requestAnimationFrame(draw)
        }
      };

      requestAnimationFrame(draw)
      window.addEventListener('resize', debounce(() => { draw() }, 100));
      return () => {
        canvas.removeEventListener("mousemove", mouse)
      }
    }
  });

  return (
    <>
      <canvas className={className}  ref={canvasRef}/>
      <canvas className='pattern' ref={patternRef} />
    </>
  )
})`
border-top: 3px solid;
border-bottom: 3px solid;
border-left-width: 4px;
border-left-style: solid;
border-right-width: 4px;
border-right-style: solid;
border-image: linear-gradient(to bottom, ${color('primary.300')}, rgba(0, 0, 0, 0), ${color('primary.300')}) 1 0.5;
border-image-slice: 1;
  ${fixedScreen}
& + .pattern {
  display: none;
}
`