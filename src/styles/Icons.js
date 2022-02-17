////////////////////
//// Build
import styled, { css } from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export const IconBox = styled.div`
  ${ ({ area }) =>
          area &&
          css`
            grid-area: ${ area };
          ` }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  &.bottom div {
  }

  &.center {
    align-self: center;

  }

  svg {
    margin: 0.4rem;
  }

  div {
    display: flex;
    align-items: end;
    justify-content: end;

  }

  &.small div {
    margin: 0 0.2rem;

    span {
      padding: 0;
      left: -50px;
      font-size: 0.7rem;
    }

  }

`
export const FinishedBox = styled.div`
  position: absolute;
  left: -20px;
  bottom: 15px;
`

export const HeartIcon = styled.div`
  padding: 1rem;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

/** Created by ownwindows on 15-01-22 **/
