import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material'
import React, { useState, useEffect } from "react";
import Intro from './compnents/Intro';
import Intro2 from './compnents/Intro2';
import SignIn from './compnents/SignIn';

function App() {

  return (
    <>
      
      <div className="App">
        {/* <div className='app__header'>
          <a>
            <img
              className='app__image'
              src='/images/logo/png/logo-no-background.png'>
            </img>
          </a>
    
        </div>
        
          <Intro2 /> */}
        
        <Intro></Intro>
        {/* <SignIn></SignIn> */}

      </div>
    </>
  );
}

export default App;
