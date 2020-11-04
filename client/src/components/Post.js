import React, {useEffect} from 'react';
import './css/Post.css'
import {Avatar} from "@material-ui/core";
import {ThumbDownAltOutlined, ThumbUpAltOutlined} from "@material-ui/icons";
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../actions'

const Post = (props) => {
    const [likedPost, setLikedPost] = React.useState(null)

    const renderFile = () => {
        function getExtension(filename) {
            let parts = filename.split('.');
            return parts[parts.length - 1];
        }

        function isImage(filename) {
            const ext = getExtension(filename);
            switch (ext.toLowerCase()) {
                case 'jpg':
                case 'gif':
                case 'bmp':
                case 'png':
                    //etc
                    return true;
            }
            return false;
        }

        function isVideo(filename) {
            const ext = getExtension(filename);
            switch (ext.toLowerCase()) {
                case 'm4v':
                case 'avi':
                case 'mpg':
                case 'mp4':
                    // etc
                    return true;
            }
            return false;
        }

        if(props.post){
            if(isImage(props.post.file)) {
                return <img className={'post__file'} src={`/api/${props.post.file}`}/>
            }else if(isVideo(props.post.file)){
                return <video className={'post__file'} src={`/api/${props.post.file}`} controls>The video is not supported.</video>
            }
        }
    }

    const handleLikeClick = () => {
        axios.post('/api/add/like', props.post).then(() => {
            props.fetchPosts()
        })
    }

    const handleDislikeClick = () => {
        axios.post('/api/add/dislike', props.post).then(() => {
            props.fetchPosts()
        })
    }
    return (
        <div className={'post'}>
            <div className="post__top">
                <div className="post__topLeft">
                    <Avatar className={'post__avatar'} />
                    <h3>{props.post?.author?.username}</h3>
                </div>
            </div>

            <div className="post__middle">
                {props.post?.body && <div className={'post__body'}>{props.post.body}</div> }
                {renderFile()}

            </div>

            <div className="post__social">
                {props.post.likes}<ThumbUpAltOutlined className={'post__likeIcon'} />{props.post.dislikes}<ThumbDownAltOutlined className={'post__dislikeIcon'}/>
            </div>

            <div className="post__bottom">
                <div onClick={handleLikeClick} className="post__like">
                    <ThumbUpAltOutlined className={'post__icon'} />
                </div>
                <div onClick={handleDislikeClick} className="post__dislike">
                    <ThumbDownAltOutlined className={'post__icon'} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, actions) (Post);