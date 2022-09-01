import {HTMLAttributes} from 'react';
import styled from 'styled-components';

interface IPixilateImage {
  src: string
}

export const PixilateImage = styled(({ className, src }: HTMLAttributes<HTMLCanvasElement> & IPixilateImage) => {
  return (
    <canvas className={className} />
  )
})`
  max-width: 100%;

`