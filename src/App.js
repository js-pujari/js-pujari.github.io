import React, { useEffect, useRef, useState } from 'react'
import './App.css';
import initializeDapi from './init';
function App() {
  const [dapi, setDapi] = useState({});
  const [er, setER] = useState(false);
  const scb = (v) => {
    console.log(v);
  }
  const onReadyCb = (v) => {
    setER(true)
  }
  useEffect(() => {
    if (window.Dapi) {
      const dapiObj = initializeDapi({ scb, onReadyCb });
      setDapi(dapiObj);
    }
  }, []);
  useEffect(() => {
    if (er) {
      dapi.open()
    }
  }, [dapi, er]);
  return (
    <div className="App">

    </div>
  );
}

export default App;
