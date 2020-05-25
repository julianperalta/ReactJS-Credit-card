import React from 'react';
import './App.css';
import {Formulario} from "./components/formulario";

const App = () => {
  const styles = ["App", "App-background"].join(" ");

  return (
    <div className = {styles}>
      <Formulario/>
    </div>
  );
}

export default App;
