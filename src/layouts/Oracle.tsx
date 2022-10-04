import styled from "styled-components";
import { spacing } from "../theme/spacing";
// import { fixedWithPadding } from '../theme/fixedScreen';
import { query } from '../theme/mediaQueries'
import { color } from "../theme/color";

export const Oracle = styled.main`
  z-index: 2;
  position: absolute;
  display: grid;
  gap: ${spacing(4)};
  padding: ${spacing(4)};
  grid-template-columns: repeat(3, 1fr);
  grid-template:
    "logo logo logo" 200px
    "status status status" 1fr
    "target target target" 1fr
    "headshot headshot headshot" 1fr
    "skill1 skill2 skill3" 20vw
    "mission mission mission" 1fr
    "history history history" 1fr
    "skillList skillList skillList" 1fr
    "fileExplorer fileExplorer fileExplorer" 1fr;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  ${query('md')}{
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-template-areas:
    "headshot headshot headshot fileExplorer fileExplorer fileExplorer status status status logo logo logo"
    "headshot headshot headshot fileExplorer fileExplorer fileExplorer target target target logo logo logo"
    "headshot headshot headshot fileExplorer fileExplorer fileExplorer target target target logo logo logo"
    "skill1 skill1 skill2 skill2 skill3 skill3 skillList skillList history history history history"
    "mission mission mission mission mission mission skillList skillList history history history history"
    "mission mission mission mission mission mission skillList skillList history history history history";
    overflow: hidden;
  }

  padding: ${spacing(3)};
`