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

// Lists
export const UnsortedProjectList = styled.ul`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const UnsortedList = styled.ul`
  margin-top: 3rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 1em;
`;

export const OrderedList = styled.ol`
  list-style: none;
  margin: 0;
  width: 100%;
  max-height: 30em;
  overflow-y: auto;
  padding: 0 1em;
`;

export const BlogOverviewList = styled.ol`
  width: 70vw;
  margin-top: 2rem;
  padding: 1rem;
  column-count: 1;
  column-gap: 1em;

  @media (min-width: 768px) {
    column-count: 2;
    column-gap: 1em;
  }
  @media (min-width: 1000px) {
    column-count: 3;
    column-gap: 1em;
  }
`

// List items

export const ListItem = styled.li`
  width: 100%;
  height: min-content;
  display: flex;
  text-decoration: none;
  align-items: center;
  position: relative;
  border: none;
  flex-direction: column;
  border-top: solid var(--box-border-medium) ${ props => props.theme.border };

  &:first-child {
    border-top: none;
  }

  &.taskItem {
    margin-top: 0.2rem;
    margin-left: 0.5rem;
    padding-right: 0.5rem;
    height: 100%;
    justify-content: space-between;
    align-items: start;
  }
`;

export const TaskListItem = styled.li`
  width: 70vw;
  margin-top: 1rem;

  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  background: ${ props => props.theme.background };

  > h6 {
    color: ${ props => props.theme.sub_text };
  }
  @media (min-width: 769px) {

  }
  @media (max-width: 660px) {
    flex-direction: column;
  }

`

export const ProjectListItem = styled.li`
  width: 70vw;
  height: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: row;
  transition: all 500ms;
  padding: 1rem;
  background: ${ props => props.theme.background };
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  //overflow: hidden;

  :not(:nth-child(1)) {
    margin-top: -130px;
    box-shadow: rgba(0, 0, 0, 0.45) 0px -20px 20px -20px;

  }

  :hover {
    border: solid var(--box-border-medium) ${ props => props.theme.border };
    box-shadow: ${ props => props.theme.shadow };
    //margin: 25px 25px 50px 25px;
    background: ${ props => props.theme.windowBackground };
    margin-bottom: 150px;

  }

  @media (min-width: 769px) {

  }

  @media (max-width: 660px) {
    flex-direction: column;
  }

`

export const UserListItem = styled.li`
  width: 70vw;
  height: min-content;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: row;
  transition: all 500ms;
  margin: 25px 25px -180px 25px;
  padding: 1rem;
  background: ${ props => props.theme.background };
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.45) 0px -20px 20px -20px;


  :hover {
    border: solid var(--box-border-medium) ${ props => props.theme.border };
    box-shadow: ${ props => props.theme.shadow };
    margin: 25px 25px 50px 25px;
    background: ${ props => props.theme.windowBackground };
  }

  @media (min-width: 769px) {

  }

  @media (max-width: 660px) {
    flex-direction: column;
  }

`
/** Created by ownwindows on 15-01-22 **/
