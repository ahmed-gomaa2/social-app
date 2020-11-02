import React from 'react'
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from './components/Navbar'
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <div className="app">
        <BrowserRouter>
            <Route component={() => <Navbar />} />
            <Route exact path={'/signup'} component={() => <Signup />} />
            <Route exact path={'/login'} component={() => <Login />} />
            <Route exact path={'/create/post'} component={() => <CreatePost />} />
        </BrowserRouter>
    </div>
  );
}

export default App;
