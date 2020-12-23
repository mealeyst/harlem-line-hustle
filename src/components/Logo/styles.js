import styled from 'styled-components'

import { Logo } from './Logo'
import {
  shrinkLogo,
  trainApproach,
  scaleUpBackground,
  changeOrangeBackgroundFill,
  changeGreenBackgroundFill,
  animateHarlem,
  animateLine,
  animateHustle,
  animateInnerRing,
  animateMiddleRing,
  animateOuterRing
} from './animations'

export const StyledLogo = styled(Logo)`
.logo {
  height: 3rem;
  animation-name: ${shrinkLogo};
  animation-duration: 10s;
  justify-self: center;
  margin: 0.75rem auto;

  .ring {
    fill: none;
    stroke: color(blue);
    stroke-width:20;
    stroke-linecap:round;
    stroke-miterlimit: 10;
  }
  .ring.inner {
    animation-name: ${animateInnerRing};
    animation-duration: 10s;
  }
  .ring.middle {
    animation-name: ${animateMiddleRing};
    animation-duration: 10s;
  }
  .ring.outer {
    animation-name: ${animateOuterRing};
    animation-duration: 10s;
  }
  .train {
    animation-duration: 10s;
    animation-name: ${trainApproach};
    transform-origin: center;
  }
  .train, .text {
    fill:#011752;
  }
  .background {
    path {
      transform-origin: center;
      animation-name: ${scaleUpBackground};
      animation-duration: 10s;
    }
    .a {
      fill: color(blue);
      animation-name: ${scaleUpBackground}, ${changeOrangeBackgroundFill};
      animation-duration: 10s;
    }
    .b {
      fill: color(blue);
    }
    .c {
      fill: color(blue);
      animation-name: ${scaleUpBackground}, ${changeGreenBackgroundFill};
      animation-duration: 10s;
    }
  }
}
.text {
  transform-origin: center;
}
.letter-1, .letter-2, .letter-3, .letter-4, .letter-5, .letter-6 {
  transform: scale(0);
  animation-duration: 10s;
  animation-name: ${animateHarlem};
}
.letter-7, .letter-8, .letter-9, .letter-10 {
  transform: scale(0);
  animation-duration: 10s;
  animation-name: ${animateLine};
}
.letter-11, .letter-12, .letter-13, .letter-14, .letter-15, .letter-16  {
  transform: scale(0);
  animation-duration: 10s;
  animation-name: ${animateHustle};
}
`