import styled from 'styled-components';

import { fixedWithPadding } from '../theme/fixedScreen';
import { spacing } from '../theme/spacing'
import { query } from '../theme/mediaQueries'

export const Trinity = styled.main`
  display: grid;
  gap: ${spacing(4)};
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: 20vh 1fr 1fr;
  grid-template-areas: 
  "logo"
  "inputs"
  "footer";
  ${query('md')}{
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 30vh 1fr 1fr;
    grid-template-areas: 
    "left logo right"
    "left inputs right"
    ". footer .";
  }
  width: 100%;
  height: 100%;
  padding: ${spacing(3)};
`