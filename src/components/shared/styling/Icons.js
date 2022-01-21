////////////////////
//// Build
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export const IconBox = styled.div`
  //align-self: start;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  &.bottom div {
    //flex-wrap: wrap;
    //justify-content: start;
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

/** Created by ownwindows on 15-01-22 **/
