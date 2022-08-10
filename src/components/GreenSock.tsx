import { useContext, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ThemeContext } from 'styled-components';
import { color } from '../theme/color';

export const Gsap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useContext(ThemeContext)
  
  useEffect(() => {
    const canvas = canvasRef.current
    let canvasProps = {
      opacity: 1
    };
    if (canvas !== null) {
      canvas.height = 200;
      canvas.width = 200;
      const ctx = canvas.getContext("2d");
      if(ctx) {
        const draw = () => {
          ctx.fillStyle = theme.colors.red['300'];
          ctx.fillRect(0, 0, 200, 200);
          ctx.fillStyle = color('primary.300', canvasProps.opacity)({theme});
          ctx.fillRect(0, 0, 200, 200);
        }
        let tl = gsap.timeline();
        tl.to(canvasProps, {
          opacity: 0,
          duration: 0.75,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          onUpdate() {
            draw();
          }
        });
      }
    }
  })
  return (
    <canvas ref={canvasRef} height="200" width="200"/>
  )
}