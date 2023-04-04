import React, {} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css';

const App = () => { 
    return (
      <div className="App">
        <BrowserRouter>
          <div className="container">
            <Routes></Routes>
          </div>
        </BrowserRouter>
      </div>
    );  
}

export default App;
