////////////////////
//// Build
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export const Table = styled.table`
  list-style: none;
  margin: 0;
  width: 100%;
  max-height: 30em;
  overflow-y: auto;
  //padding: 0 1em;
  border-collapse: collapse;


  &.project-tasks {
    & > li {
      list-style: initial;
    }
  }
`;

export const TableRow = styled.tr`
  width: 100%;

  border-bottom: solid var(--box-border-medium) ${ props => props.theme.border };

  th {
    text-align: left;

    font-size: 0.9rem;
    font-weight: 500;

    &.name {
      width: 15%;
    }
    &.description {
      width: 30%;
    }
    &.date {
      text-align: right;

      width: 12%;
    }
  }

  td {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
    max-width: 10px;
    font-size: 0.9rem;
    &.date {
      text-align: right;
    }

  }
  
`;

/** Created by ownwindows on 15-01-22 **/
