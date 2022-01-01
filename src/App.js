///////////////////////
//// Built-in
import React, {useState} from "react";

///////////////////////
//// Internal
import './App.scss';
import RectangleButton from "./components/shared/buttons/RectangleButton/RectangleButton";
import Form from "./components/layout/forms/Form/Form";
import Navigation from "./components/layout/nav/Navigation";
import UserTable from "./components/layout/UserTable/UserTable";

function App() {
  const [value, setValue] = useState(``);
  const [formState, setFormState] = useState({})


  return (
      <>
        <Navigation/>
        <header>
            <UserTable/>


        </header>
      </>
  );
}

export default App;
