import styled from 'styled-components';

import { fixedScreen } from '../theme/fixedScreen';
import { spacing } from '../theme/spacing'
import { query } from '../theme/mediaQueries'

export const Trinity = styled.main`
  display: grid;
  gap: ${spacing(4)};
  padding: ${spacing(4)};
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 1fr 1fr;
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
}
  ${fixedScreen}
`