////////////////////
//// Build
import React, { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { UtilityContext } from "../../context/UtilityProvider";

////////////////////
//// Environmental

////////////////////
//// External

function LogoLoader() {
    const { isLoading } = useContext(UtilityContext);

    const [ localLoader, setLocalLoader ] = useState(isLoading);
    console.log(localLoader);


    return (
        <Container>
            <Logo data-text="willpowered">
                willpowered <span>students</span>
            </Logo>
        </Container>
    )
}

const type = keyframes`
  from {
    width: 0;
  }

`

const Container = styled.div`
  //display: flex;
  ////position: relative;
  align-items: center;
  justify-content: center;

`

const Logo = styled.div`
  padding: 1rem 0;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.7rem;
  font-family: var(--tittle-font);
  overflow: hidden;
  width: 30em;
  white-space: nowrap;
  color: ${ isLoading => isLoading ? "var(--secondary)" : "var(--tertiary)"};



  span {
    font-weight: 300;
  }

`
export default LogoLoader;
/** Created by ownwindows on 03-01-22 **/
