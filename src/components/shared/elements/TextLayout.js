////////////////////
//// Build
import React from 'react'
import styled from 'styled-components';

////////////////////
//// Environmental

////////////////////
//// External

export const Section = styled.section`
  margin: 3em auto;

  &:first-child {
    margin-top: 0;
  }
`;

export const CenteredSection = styled(Section)`
  text-align: center;
`;


export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const ListItemTitle = styled.p`
  font-weight: bold;
`;

export const ListMetaData = styled.div`
  display: flex;
  flex: 2 0;
  flex-direction: column;
  justify-content: space-between;
`

export const Category = styled.div`
  position: relative;
  top: -5px;
  font-size: 0.9rem;
  font-weight: 300;
  font-style: italic;
`
export const Owner = styled.span`
  font-weight: 500;
`

export const Users = styled.div`
  font-size: 0.9rem;

`

export const Votes = styled.footer`
  font-size: 0.9rem;
`

export const Description = styled.div`
  flex: 4;
  padding: 0 1rem;
`
export const Details = styled.div`
  flex: 2;
  display: flex;
`
export const Collaborators = styled.span`

`

export const HeaderContainer = styled.div`
  background: ${ props => props.theme.background };
  color: ${ props => props.theme.text };
  align-self: center;
  margin-top: 10vh;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  border: solid var(--box-border-medium) ${ props => props.theme.border };
  height: max-content;
  width: 80vw;
  
  h1 {
    margin-bottom: 1rem;
    color: ${ props => props.theme.header };
  }
  p {
    
  }
`
/** Created by ownwindows on 15-01-22 **/
