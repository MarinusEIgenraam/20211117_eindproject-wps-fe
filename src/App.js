///////////////////////
//// Built-in
import React, {useState} from "react";

///////////////////////
//// Internal
import './App.css';
import RectangleButton from "./components/shared/buttons/RectangleButton/RectangleButton";
import Form from "./components/layout/Form/Form";

function App() {
  const [value, setValue] = useState(``);


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


        </header>
      </>
  );
}

export default App;
