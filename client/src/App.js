import React from 'react'
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <div className="app">
        <BrowserRouter>
            <Route exact path={'/signup'} component={() => <Signup />} />
            <Route exact path={'/login'} component={() => <Login />} />
        </BrowserRouter>
    </div>
  );
}

export default App;
