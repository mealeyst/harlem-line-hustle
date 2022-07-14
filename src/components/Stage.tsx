import debounce from "lodash/debounce";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { fixedScreen } from "../theme/fixedScreen";

export interface Points {
  x1: number
  x2: number
  y1: number
  y2: number
}

export const Stage = styled(({className}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      let posX = 100;
      let posY = 100;

      const mouse = (event: MouseEvent) => {
        posX = event.clientX;
        posY = event.clientY;
      }
      document.body.addEventListener('mousemove', mouse);
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


        if (ctx) {
          ctx.fillStyle = "#081219";
          ctx.fillRect(0, 0, stageWidth, stageHeight);

          const drawLine = (points: Points) => {
            ctx.beginPath();
            ctx.moveTo(points.x1, points.y1);
            ctx.lineTo(points.x2, points.y2);
            ctx.closePath();
            ctx.strokeStyle = "#1B4332";
            ctx.lineWidth = 1;
            ctx.stroke();
          };

          const gridSize = stageWidth > stageHeight ? stageWidth * 0.03 : stageHeight * 0.03;

          for (let x = 0 - gridSize; x < stageWidth; x = x + gridSize) {
            for (let y = 0; y < stageHeight; y = y + gridSize) {
              drawLine({
                x1: x,
                y1: y,
                x2: x + gridSize,
                y2: y + gridSize
              });
              drawLine({
                x1: x + gridSize * 2,
                y1: y,
                x2: x + gridSize,
                y2: y + gridSize
              });
            }
          }

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
    <canvas className={className} ref={canvasRef} />
  )
})`
border-top: 3px solid;
border-bottom: 3px solid;
border-left-width: 4px;
border-left-style: solid;
border-right-width: 4px;
border-right-style: solid;
border-image: linear-gradient(to bottom, #74c69d, rgba(0, 0, 0, 0), #74c69d) 1 0.5;
-webkit-border-image: linear-gradient(to bottom, #74c69d, rgba(0, 0, 0, 0), #74c69d) 1 0.5;
  ${fixedScreen}
`