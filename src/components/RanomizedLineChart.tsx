import { forEach } from "lodash";
import React, { useContext, useEffect, useRef } from "react";
import styled, { ThemeContext } from "styled-components";
import { spacing } from "../theme/spacing";

interface Wave {
  y: number;
  length: number;
  amplitude: number;
  increment: number;
}

export const RandomizedLineChart = styled(({className}) => {
  const themeContext = useContext(ThemeContext)
  const canvas = useRef<HTMLCanvasElement>(null);
  const yAxisLabel = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (canvas.current && yAxisLabel.current) {
      const chartHeight = canvas.current.offsetHeight;
      const chartWidth = canvas.current.offsetWidth;
      canvas.current.height = chartHeight;
      canvas.current.width = chartWidth;
      yAxisLabel.current.style.width = `${chartHeight}px`;
      const ctx = canvas.current.getContext("2d");
      const createWaves = (count: number) => {
        return Array.from({length: count}, () => ({
            y: chartHeight / 2,
            length: Math.random() * 0.5,
            amplitude: Math.random() * (50 - 20) + 50,
            frequency: Math.random() * (.06 - .03) + .04,
            increment: 0
        }))
      }
      if(ctx) {
        const waves = createWaves(3)
        const animate = () => {
          requestAnimationFrame(animate)
          ctx.clearRect(0,0, chartWidth, chartHeight);
          ctx.fillStyle = "hsla(155,43%,18%,0.1)";
          ctx.fillRect(0, 0, chartWidth, chartHeight);
          waves.forEach((wave, index) => {
            ctx.beginPath()
            ctx.moveTo(0, chartHeight / 2);
              for ( let i = 0; i < chartWidth;  i++) {
                ctx.lineTo(i, wave.y + Math.sin(i * wave.length + wave.increment) * wave.amplitude)
              }
              ctx.strokeStyle = themeContext.colors.primary["200"];
            ctx.stroke();
            wave.increment = wave.increment === 1 ? 0 : wave.increment + wave.frequency;
          })
        }
        animate()
      }
    }
  })
  return (
    <div className={className}>
      <span  className="chart-title">Sever Signal</span>
      <span className="y-axis-label" ref={yAxisLabel}>Amplitude</span>
      <canvas  ref={canvas} />
      <span className="x-axis-label">Frequency</span>
    </div>
  )
})`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  padding: ${spacing(6)};
  flex-wrap: wrap;
  .chart-title, .y-axis-label, .x-axis-label{
    text-transform: uppercase;
    width: 100%;
    display: flex;
    justify-content: center;
    letter-spacing: .5rem;
    flex-basis: 100%;
  }
  .chart-title {
    margin-bottom: 4px;
  }
  .y-axis-label {
    transform: rotate(270deg);
    transform-origin: 0 0;
    position: absolute;
    left: 0;
    bottom: 19px;
  }
  .x-axis-label {
    margin-top: 4px;
  }
  canvas {
    border: 1px solid #74c69d;
    height: 90%;
    width: 90%;
  }
`