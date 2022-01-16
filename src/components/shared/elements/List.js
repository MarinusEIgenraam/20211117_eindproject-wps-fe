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

export const ProjectList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  a {
    background-color: #fff;
    padding: 16px;
    border-radius: 6px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
    text-decoration: none;
    color: inherit;
  }
  h4 {
    font-size: 0.9em;
    color: var(--heading-color);
  }
  p {
    color: var(--text-color);
    font-size: 0.9em;
  }
  //.assigned-to {
  //  margin-top: 20px;
  //  padding-top: 10px;
  //  border-top: 1px solid #eee;
  //}
  //ul {
  //  margin: 10px 0;
  //  display: flex;
  //}
  //li {
  //  margin-right: 10px;
  //}
  //.avatar {
  //  width: 30px;
  //  height: 30px;
  //}
  
`
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
