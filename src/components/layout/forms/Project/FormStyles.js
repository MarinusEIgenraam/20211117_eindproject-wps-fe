import styled, { css } from "styled-components";
import { QUERIES } from "../../../../services/helpers/mediaQueries";

export const Form = styled.form`
  max-width: 70vw;
  padding: 2rem 1rem;
  z-index: auto;
  margin-top: 2rem;
      background: ${ props => props.theme.createBackground };
  border: solid var(--box-border-medium) ${ props => props.theme.createBorder };
  box-shadow: ${ props => props.theme.createShadow };

  @media ${ QUERIES.tabletMini } {
    padding: 1rem 2.9rem;
  }
`;

export const Heading = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 2rem;
  padding:0;
  color: ${ props => props.theme.text };

  @media ${ QUERIES.tabletMini } {
    font-size: 2rem;
  }
`;

export const FormSectionHeading = styled.h3`
  margin: 2rem 0rem 1rem 0rem;
  font-size: 0.9rem;
  color: ${ props => props.theme.sub_text };
`;

export const SubFormHeading = styled.h4`
  width: 100%;
  margin: 0.5rem 0rem 0.5rem 0rem;
  font-size: 0.8rem;
  color: ${ props => props.theme.text };
`;

export const FormSection = styled.div`
`;

export const FormInputWrap = styled.div`

  
  @media ${ QUERIES.mobile } {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    

    & > * {
      flex: 1 100% 100%;
    }
  }
`;

export const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
  width: 100%;

  label {
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }
  
  &.radio{
    flex-direction: row;
    justify-content: space-between;
    
    input {
height: 1rem;
    }
  }

  input {
    border: ${ props => props.theme.createBorder } solid var(--box-border-thin);
    padding: 0.75rem 1rem;
    color: ${ props => props.theme.text };
    font-size: 1rem;
    background-color: ${ props => props.theme.background };
    height: 3rem;

    &:focus,
    &:hover {
      outline: ${ props => props.theme.createBorder } solid var(--box-border-medium);
    }
  }

  textarea {
    min-height: 7rem;
    border: ${ props => props.theme.createBorder } solid var(--box-border-thin);
    padding: 0.75rem 1rem;
    color: ${ props => props.theme.text };
    font-size: 1rem;
    text-transform: capitalize;
    background-color: ${ props => props.theme.background };

    &:focus,
    &:hover {
      outline: ${ props => props.theme.createBorder } solid var(--box-border-medium);
    }
  }
`;

export const FormLabel = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FormError = styled.div`
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
  color: ${ props => props.theme.sub_text };
  text-align: right;

  & > * {
    flex: 1;
  }
`;

export const FormBreak = styled.div`
  @media ${ QUERIES.mobile } {
    flex: 1 50% 100%;
    gap: 1rem;
    width: 49%;
  }
`;
