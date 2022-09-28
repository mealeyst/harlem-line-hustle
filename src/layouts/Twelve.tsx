import styled from "styled-components";
import { spacing } from "../theme/spacing";
import { fixedWithPadding } from '../theme/fixedScreen';

export const Twelve = styled.main`
  display: grid;
  gap: ${spacing(4)};
  padding: ${spacing(4)};
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, 1fr);

  ${fixedWithPadding}
`