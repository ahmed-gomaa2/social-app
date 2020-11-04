import React, {useEffect} from 'react';
import './css/Home.css';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Post from './Post'

const Home = (props) => {
    return (
        <div className={'home'}>
            {props.posts?.map((post, index) => (
                <Post post={post}/>
            ))}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
        posts: state.posts
    }
}

export default connect(mapStateToProps, actions) (Home);