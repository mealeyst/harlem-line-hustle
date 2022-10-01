import { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from 'gsap';
import { color } from "../theme/color";
import { spacing } from "../theme/spacing";

export const DossierImage = styled(({className}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const image = new Image();
  image.src = `${process.env.PUBLIC_URL}/Shawn_Mealey.jpeg`
  const imageProps = {
    scale: 0.1,
    width: 0,
    height: 0,
    scaled: {
      width: 0,
      height: 0,
    },
    xPos: 0,
    yPos: 0,
  }
  useEffect(() => {
    image.onload = () => {
      const imageAspectRatio = image.width/image.height
      const draw = () => {
        const canvas = canvasRef.current
        if(canvas) {
          canvas.width = canvas.offsetWidth
          canvas.height = canvas.offsetHeight
          const canvasAspectRatio = canvas.width / canvas.height
          imageProps.width = (imageAspectRatio < canvasAspectRatio) ? (canvas.offsetWidth * (image.width/image.height)) : canvas.offsetWidth
          imageProps.height = (imageAspectRatio > canvasAspectRatio)  ? (canvas.offsetHeight * (image.width/image.height)) : canvas.offsetHeight
          imageProps.xPos = Math.ceil((canvas.offsetWidth - imageProps.width) / 2)
          imageProps.yPos = Math.ceil((canvas.offsetHeight - imageProps.height) / 2)
          console.log(imageProps, {imageAspectRatio, canvasAspectRatio})

          const ctx = canvas.getContext('2d');

          // Calculate the scaled dimensions.
          imageProps.scaled.width = imageProps.width * imageProps.scale;
          imageProps.scaled.height = imageProps.height * imageProps.scale;

          if(ctx) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(
              image,
              imageProps.xPos,
              imageProps.yPos,
              imageProps.scaled.width,
              imageProps.scaled.height
            );
            ctx.drawImage(
              canvas,
              imageProps.xPos,
              imageProps.yPos,
              imageProps.scaled.width,
              imageProps.scaled.height,
              imageProps.xPos,
              imageProps.yPos,
              imageProps.width,
              imageProps.height
            );
          }
        }
      }
      let tl = gsap.timeline();
        tl.to(imageProps, {
          scale: 0.8,
          duration: 2,
          onUpdate() {
            draw();
          }
        });
      // draw()
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