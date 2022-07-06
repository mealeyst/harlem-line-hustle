import React from 'react';
import styled from 'styled-components';

import { fixedScreen } from '../theme/fixedScreen';
import { spacing } from '../theme/spacing'

export const Trinity = styled(({className, children}) => {
  return (
  <main className={className}>
    {children}
  </main>
  );
})`
  display: grid;
  gap: ${spacing(4)};
  padding: ${spacing(4)};
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 1fr 1fr;
  grid-template-areas: 
  "logo"
  "inputs"
  "footer";
}
  ${fixedScreen}
`