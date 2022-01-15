////////////////////
//// Build
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export const ListWrapper = styled.div`
  padding: 0;
  margin: 0;
  width: 100%;
  background: ${ props => props.theme.background };
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  overflow: hidden;
`;

export const Ul = styled.ul`
  list-style: none;
  margin: 0;
  width: 100%;
  max-height: 30em;
  overflow-y: auto;
  padding: 0 1em;
`;

export const SL = styled.ol`
  list-style: none;
  margin: 0;
  width: 100%;
  max-height: 30em;
  overflow-y: auto;
  padding: 0 1em;
`;

export const TaskList = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;

  li:nth-child(1) {
    div label {
      p {
        visibility: visible;
      }
    }
  }
  `

export const ListItem = styled.li`
  width: 100%;
  height: 3em;
  display: flex;
  align-items: center;
  position: relative;
  border: none;
  flex-direction: column;
  border-top: solid var(--box-border-medium) ${ props => props.theme.border };

  &:first-child {
    border-top: none;
  }
`;



/** Created by ownwindows on 15-01-22 **/
