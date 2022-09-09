import styled from "styled-components";
import { spacing } from "../theme/spacing";
import { fixedScreen } from '../theme/fixedScreen';
import { query } from '../theme/mediaQueries'

export const Oracle = styled.main`
  display: grid;
  gap: ${spacing(4)};
  padding: ${spacing(4)};
  grid-template-columns: repeat(3, 1fr);
  grid-template:
    "logo logo logo" 200px
    "status status status" 10vw
    "headshot headshot headshot" 1fr
    "skill1 skill2 skill3" 25vw;
  ${query('md')}{
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-template-areas:
    "headshot headshot headshot fileExplorer fileExplorer fileExplorer status status status logo logo logo"
    "headshot headshot headshot fileExplorer fileExplorer fileExplorer target target target logo logo logo"
    "headshot headshot headshot fileExplorer fileExplorer fileExplorer target target target logo logo logo"
    "headshot headshot headshot skill1 skill2 skill3 skillList skillList history history history history"
    "mission mission mission mission mission mission skillList skillList history history history history"
    "mission mission mission mission mission mission skillList skillList history history history history";
  }
  overflow: scroll;
  ${fixedScreen}
`