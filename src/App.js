import React, {useState} from "react";

import './App.css';
///////////////////////
//// Internal
import RectangleButton from "./components/shared/buttons/RectangleButton/RectangleButton";
import InputField from "./components/shared/ImputField/InputField";
import { Validators } from "./validator/Validator";
import Form from "./components/layout/Form/Form";

function App() {
  const [value, setValue] = useState(``);

  const handleChange = (value) => {
    console.log(value);
    setValue(value);
  };

  return (
      <>
        <header>
          <h1>
            Fruit perfection
          </h1>
            <Form/>
          <RectangleButton onClick={() => console.log('Jij wil shoppen')} buttonSize={'btn--large'}
                           buttonStyle={"btn--special--outline"}>
            register
          </RectangleButton>
          <h1>
            Imput testfield
          </h1>
            <InputField
                value={value}
                placeholder='TextField'
                type='text'
                label='Username'
                validators={[
                    {check: Validators.required, message: 'This field is required'}
                ]}
                onChange={handleChange}
            />
            <InputField
                value={value}
                placeholder='NumberField'
                type='number'
                label='Number'
                validators={[
                    {check: Validators.number, message: 'Number is not valid'}
                ]}
                onChange={handleChange}
            />
            <InputField
                value={value}
                placeholder='EmailField'
                type='email'
                label='Email'
                validators={[
                    {check: Validators.email, message: 'Email is not valid'}
                ]}
                onChange={handleChange}
            />

        </header>
      </>
  );
}

export default App;
