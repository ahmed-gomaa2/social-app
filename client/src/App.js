import React, {useEffect} from 'react'
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from './components/Navbar';
import CreatePost from "./components/CreatePost";
import {connect} from 'react-redux';
import * as actions from './actions'
import Home from "./components/Home";

function App(props) {

    useEffect(() => {
        props.fetchPosts()
    }, [])
  return (
    <div className="app">
        <BrowserRouter>
            <Route component={() => <Navbar />} />
            <Route exact path={'/'} component={() => <Home /> } />
            <Route exact path={'/signup'} component={() => <Signup />} />
            <Route exact path={'/login'} component={() => <Login />} />
            <Route exact path={'/create/post'} component={() => <CreatePost />} />
        </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
    return {
        user: state.user,
        posts: state.posts
    }
}

export default connect(mapStateToProps, actions) (App);
