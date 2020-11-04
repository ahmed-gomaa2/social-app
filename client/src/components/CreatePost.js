import React from 'react';
import './css/CreatePost.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

const CreatePost = (props) => {
    const [file, setFile] = React.useState(null);
    const [body, setBody] = React.useState('');
    const [errors, setErrors] = React.useState({});
    const history = useHistory();

    const handleFileChange = e => {
        if(e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleValidations = () => {
        let errors = {};
        let formIsValid = true;

        if(!file && !body) {
            formIsValid = false;
            errors['form'] = "You forgot to add content!"
        }

        if(!props.user?.username) {
            formIsValid = false;
            errors['form'] = "You aren't Signed In."
            history.push('/login')
        }
        setErrors(errors);
        return formIsValid;
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        if(handleValidations() && file) {
            const fileForm = new FormData();
            fileForm.append('file', file, file.name);
            axios.post('/api/upload/file', fileForm, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${fileForm._boundary}`
                }
            }).then(res => {
                const post = {
                    body: body,
                    file: res.data.filename
                }
                axios.post('/api/new/post', post).then((res) => {
                    props.fetchPosts()
                    if(res.data.body) {
                        history.push('/')
                    }
                } )
            })
        }else if(handleValidations() && !file) {
            const post = {
                body: body
            }

            axios.post('/api/new/post', post).then(res => {
                props.fetchPosts()
                if(res.data.body) {
                    history.push('/')
                }
            })
        }
    }
    return (
        <div className={'createPost'}>
            <div className="createPost__container">
                <div className="createPost__header">
                    <h1>Create New Post</h1>
                    {errors.form && <p style={{color: 'red'}}>{errors.form}</p>}
                </div>
                <form onSubmit={handleFormSubmit} className="createPost__form">
                    <div className="createPost__formLine">
                        <label htmlFor="">Post Body:</label>
                        <textarea value={body} onChange={e => setBody(e.target.value)} rows={'6'} />
                    </div>
                    <div className="createPost__formLine">
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <i className="fas fa-upload"></i> Upload File
                        </label>
                        <input onChange={handleFileChange} id="file-upload" type="file"/>
                    </div>
                    <div className="createPost__buttons">
                        <button type={"submit"}>Create</button>
                        <Link to={"/"}>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, actions) (CreatePost);