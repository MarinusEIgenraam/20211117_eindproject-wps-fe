import styled from "styled-components";
import { QUERIES } from "../services/helpers/mediaQueries";

export const Form = styled.form`
  max-width: 70vw;
  width: 100%;
  padding: 2rem 1rem;
  z-index: auto;
  //position: relative;
  background: ${ props => props.theme.createBackground };
  border: solid var(--box-border-medium) ${ props => props.theme.createBorder };
  box-shadow: ${ props => props.theme.createShadow };

  &.editForm {
    display: flex;
    background: ${ props => props.theme.createBackground };
    border: none;
    box-shadow: none;
    margin: 0;
    padding: 0;
  }

  &#footerForm {
    background: transparent;
    border: none;
    display: flex;
    padding: 0;
    margin: 0;
    justify-content: space-between;
    width: 100%;

    input {
      padding: 0.5rem;
    }

  }

  @media ${ QUERIES.tabletMini } {
    padding: 1rem 2.9rem;
  }
`;

export const FormSection = styled.div`
`;

export const FormInputWrap = styled.div`
  width: 100%;


  @media ${ QUERIES.mobile } {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;


    & > * {
      flex: 1 100% 100%;
    }
  }
`;

export const FormEdit = styled.div`
  display: flex;
  flex-direction: column;
  //width: 100%;

  label {
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }

  &.radio {
    flex-direction: row;
    justify-content: space-between;

    input {
      height: 1rem;
    }
  }

  input,
  #SelectContainer {
    border: ${ props => props.theme.createBorder } solid var(--box-border-thin);
    padding: 0.25rem 0.25rem;
    height: 1.5rem;
    color: ${ props => props.theme.text };
    font-size: 0.8rem;
    background-color: ${ props => props.theme.background };
    //flex: 0 1;

    &::placeholder {
      color: ${ props => props.theme.sub_text };
    }

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

export const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
  width: 100%;

  label {
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
  }

  &.radio {
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

    &::placeholder {
      color: ${ props => props.theme.sub_text };
    }

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

export const FormEditBreak = styled.div`
  flex: 1 100%;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.25rem;
  justify-content: space-between;



  @media ${ QUERIES.mobile } {
    flex: 1 50% 100%;
  }
`;

export const FormBreak = styled.div`
width: 100%;
  @media ${ QUERIES.mobile } {
    gap: 1rem;

    flex: 1 50% 100%;
    width: 49%;
  }
`;