////////////////////
//// Build
import styled from 'styled-components';
import { QUERIES } from "../services/helpers/mediaQueries";

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
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const OrderedList = styled.ol`
  list-style: none;
  margin: 0;
  width: 100%;
  max-height: 30em;
  overflow-y: auto;
  padding: 0 1em;
  
  &.project-tasks {
    & > li {
      list-style: initial;
    }
  }
`;

export const BlogOverviewList = styled.ol`
  width: 70vw;
  margin-top: 2rem;
  *zoom: 1;
  max-width:100%;
  padding-left: 1em;
  padding-right: 1em;
  margin-left: auto;
  margin-right: auto;

  column-count: 1;
  column-gap: 1em;

  :after {
    content: "";
  }

  & > div {
    transition: all 0.7s ease-in 0.7s;
  }

  @media ${ QUERIES.mobile } {
    column-count: 2;
  }

  @media ${ QUERIES.desktop } {
    column-count: 3;
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
  &.project-task {
    flex-direction: row;
    justify-content: space-between;
    & > * {
      font-size: 0.9rem;
    } 
  }
  
  &.alert-list{
    align-items: start;
    width:70vw;
    h5{
      margin: 0;
      padding: 0;
    }
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
  @media ${ QUERIES.mobile } {
    flex-direction: column;
  }
`

export const CommentListItem = styled(ListItem)`
  width: 40vw;
  padding: 1em;
  justify-content: start;
  align-items: start;
  /*border: solid var(--box-border-medium) ${ props => props.theme.border };*/
  height: min-content;
  border-top:none;
  
  & footer {
    display: flex;
    text-align: start;
  }

`

export const ProjectPageListItem = styled.li`
  width: 70vw;
  height: min-content;
  margin-top: 2rem;
  display: flex;
  //position: relative;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  transition: all 500ms;
  padding: 1rem;
  background: ${ props => props.theme.background };
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  overflow: hidden;
  
  
  :not(:nth-child(1)) {
    margin-top: -130px;
    box-shadow: rgba(0, 0, 0, 0.45) 0px -20px 20px -20px;

  }
  :hover {
    border: solid var(--box-border-medium) ${ props => props.theme.border };
    box-shadow: ${ props => props.theme.shadow };
    background: ${ props => props.theme.windowBackground };
    margin-bottom: 150px;
  }

  // @media ${ QUERIES.mobile } {
  //   flex-direction: row;
  // }

`

export const ProjectListItem = styled.li`
width: 70vw;
  height: 100%;
  margin-top: 1rem;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  transition: all 500ms;
  background: ${ props => props.theme.background };
  overflow: hidden;
  
`

export const UserListItem = styled.li`
  width: 70vw;
  height: min-content;
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  transition: all 500ms;
  margin: 25px 25px -180px 25px;
  padding: 1rem;
  background: ${ props => props.theme.background };
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.45) 0px -20px 20px -20px;

 &.userDetails{
   margin: 25px 25px -75px 25px;
 }
  :hover {
    border: solid var(--box-border-medium) ${ props => props.theme.border };
    box-shadow: ${ props => props.theme.shadow };
    margin: 25px 25px 50px 25px;
    background: ${ props => props.theme.windowBackground };
  }

  @media (min-width: 769px) {
    flex-direction: column;

  }



`
/** Created by ownwindows on 15-01-22 **/
