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
          const aspectRatio = image.width/image.height;
          const imageHeight = (canvas.offsetHeight * aspectRatio)
          const yPos = (canvas.offsetHeight - imageHeight) / 2
          const ctx = canvas.getContext('2d');

          // Calculate the scaled dimensions.
          var scaledWidth = canvas.width * imageProps.scale;
          var scaledHeight = canvas.height * imageProps.scale;
          if(ctx) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(image, 0, yPos, scaledWidth, scaledHeight);
            ctx.drawImage(canvas, 0, yPos, scaledWidth, scaledHeight, 0, yPos, canvas.offsetWidth, imageHeight);
          }
        }
      }
      let tl = gsap.timeline();
        tl.to(imageProps, {
          scale: 0.6,
          duration: 2,
          ease: "power1",
          onUpdate() {
            draw();
          }
        });
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