import debounce from "lodash/debounce";
import { useContext, useEffect, useRef } from "react";
import styled, { ThemeContext } from "styled-components";
import { fixedScreen } from "../theme/fixedScreen";
import { color } from "../theme/color"
import { useAppSelector } from "../hooks/state";
import { selectLoginError } from "../redux/homepage/selectors";

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
  const error = useAppSelector(selectLoginError)
  const errorClass = error ? 'error' : '';
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
      const RGB = [255,255,255] ; // black any values from 0 to 255
      // const alphas = [0,0,0.2,0.5,0.9,0.95]; // zero is transparent one is not
      const alphas = [0.95, 0.9, 0.5, 0.2, 0, 0]
      const draw = () => {
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
          patternCtx.strokeStyle = theme.colors.primary["500"];
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
      <canvas className={`${className} ${errorClass}`}  ref={canvasRef}/>
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
transition: border 0.3s ease-in-out;
  ${fixedScreen}
& + .pattern {
  display: none;
}
&.error {
  border-image: linear-gradient(to bottom, ${color('red.300')}, rgba(0, 0, 0, 0), ${color('red.300')}) 1 0.5;
}
`