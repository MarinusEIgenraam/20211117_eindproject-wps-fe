///////////////////////
//// Built-in
import React, {useState} from "react";

///////////////////////
//// Internal
import './App.css';
import RectangleButton from "./components/shared/buttons/RectangleButton/RectangleButton";
import Form from "./components/layout/Form/Form";
import Navigation from "./components/layout/nav/Navigation";
import UserTable from "./components/layout/UserTable/UserTable";

function App() {
  const [value, setValue] = useState(``);


  return (
      <>
        <Navigation/>
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
            <UserTable/>


        </header>
      </>
  );
}

export default App;
