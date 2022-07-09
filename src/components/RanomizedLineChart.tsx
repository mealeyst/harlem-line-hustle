import React, { useContext, useEffect, useRef } from "react";
import styled, { ThemeContext } from "styled-components";

export const RandomizedLineChart = styled(({className}) => {
  const themeContext = useContext(ThemeContext)
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvas.current) {
      const chartHeight = canvas.current.offsetHeight;
      const chartWidth = canvas.current.offsetWidth;
      canvas.current.height = chartHeight;
      canvas.current.width = chartWidth;
      const ctx = canvas.current.getContext("2d");
      const wave = {
        y: chartHeight / 2,
        length: 0.01,
        amplitude: 50,
        frequency: 0.01
      }
      if(ctx) {
        let increment = 0.1;
        const animate = () => {
          requestAnimationFrame(animate)
          ctx.clearRect(0,0, chartWidth, chartHeight);
          ctx.fillStyle = "hsla(155,43%,18%,0.1)";
          ctx.fillRect(0, 0, chartWidth, chartHeight);
          ctx.beginPath()
          ctx.moveTo(0, chartHeight / 2)
          for ( let i = 0; i < chartWidth;  i++) {

            ctx.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude)
          }
          ctx.strokeStyle = themeContext.colors.primary["200"];
          ctx.stroke();
          increment += wave.length;
        }
        animate()
      }
    }
  })
  return (
    <canvas className={className} ref={canvas} />
  )
})`
  height: 100%;
  width: 100%;
  border: 1px solid #74c69d;
`