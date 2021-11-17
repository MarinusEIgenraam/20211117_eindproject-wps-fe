import logo from './logo.svg';
import './App.css';

///////////////////////
//// Internal
import RectangleButton from "./components/shared/buttons/RectangleButton";

function App() {
  return (
<>
  <header>
    <h1>
      Fruit perfection
    </h1>
    <button
        type="button"
        onClick={() => console.log('Jij wil shoppen')}
    >
      Shop nu
    </button>


  </header>
  <RectangleButton buttonSize={'btn--large'} buttonStyle={"btn--special--outline"}>
    register
  </RectangleButton>
</>
  );
}

export default App;
