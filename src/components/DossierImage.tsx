import { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from 'gsap';
import { color } from "../theme/color";
import { spacing } from "../theme/spacing";

export const DossierImage = styled(({className}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const image = new Image();
  image.src = "./Shawn_Mealey.jpeg";
  const imageProps = {
    scale: 0.1
  }
  useEffect(() => {
    image.onload = () => {
      const draw = () => {
        const canvas = canvasRef.current
        if(canvas) {
          canvas.width = canvas.offsetWidth
          canvas.height = canvas.offsetHeight
          const imageWidth = (canvas.offsetWidth > canvas.offsetHeight) ? (canvas.offsetWidth * (image.width/image.height)) : canvas.offsetWidth
          const imageHeight = (canvas.offsetHeight > canvas.offsetWidth) ? (canvas.offsetHeight * (image.width/image.height)) : canvas.offsetHeight
          const xPos = Math.ceil((canvas.offsetWidth - imageWidth) / 2)
          const yPos = Math.ceil((canvas.offsetHeight - imageHeight) / 2)

          const ctx = canvas.getContext('2d');

          // Calculate the scaled dimensions.
          const scaledWidth = imageWidth * imageProps.scale;
          const scaledHeight = imageHeight * imageProps.scale;

          if(ctx) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(image, xPos, yPos, scaledWidth, scaledHeight);
            ctx.drawImage(canvas, xPos, yPos, scaledWidth, scaledHeight, xPos, yPos, imageWidth, imageHeight);
          }
        }
      }
      let tl = gsap.timeline();
        tl.to(imageProps, {
          scale: 0.6,
          duration: 2,
          onUpdate() {
            draw();
          }
        });
      window.addEventListener('resize', draw)
    };
  })
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
border-image: linear-gradient(to bottom, ${color('primary.300')}, rgba(0, 0, 0, 0), ${color('primary.300')}) 1 0.5;
border-image-slice: 1;
height: 100%;
margin: ${spacing(4)};
width: 100%;
background-color: ${color('primary.900', 0.2)};
backdrop-filter: blur(5px);
`