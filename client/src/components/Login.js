import React from 'react';
import './css/Login.css';
import loginImage from './images/signup.jpg';
import {connect} from 'react-redux'
import * as actions from '../actions'
import {Link} from "react-router-dom";

const Login = (props) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState({})
    const [mongooError, setMongooError] = React.useState(null)

    const handleValidation = () => {
        let errors = {};
        let valid = true;

        if(!username) {
            valid = false;
            errors['username'] = 'Enter your name!';
        }

        if(!password) {
            valid = false;
            errors["password"] = "Enter your password!"
        }

        setErrors(errors)
        return valid;
    }

    const handleMongoErrors = () => {
        let valid = true;
        let message;
        if(props.user?.message) {
            message = props.user.message;
            valid = false;
        }
        setMongooError(message)
        return valid
    }

    const handleFormSubmit = e => {
        e.preventDefault();

        if(handleValidation() && handleMongoErrors()) {
            const user = {
                username: username,
                password: password
            }

            props.logUserIn(user).then(() => {
                props.fetchingUser()
            })
        }
    }

    return (
        <div className={'login'}>
            <div className="login__container">
                <div className="login__left">
                    <img src={loginImage} alt=""/>
                </div>
                <div className="login__right">
                    <h1>Login</h1>
                    {mongooError && <p style={{color: 'red'}}>{mongooError}</p>}
                    <form onSubmit={handleFormSubmit} className={'login__form'}>
                        <div className="login__formLine">
                            <label htmlFor="">User Name:</label>
                            <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder={'Name'}/>
                            {errors.username && <p style={{color: 'red'}}>{errors.username}</p>}
                        </div>
                        <div className="login__formLine">
                            <label htmlFor="">Password</label>
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder={'Password'}/>
                            {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
                        </div>
                        <div className="login__formButtons">
                            <button className={'login__formSubmit'}>Login</button>
                            <div className="login__signup">
                                <p>Don't have account?</p>
                                <Link to={'/signup'} className={'login__formSignUp'}>Sign Up</Link>
                            </div>
                        </div>
                    </form>
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

export default connect(mapStateToProps, actions) (Login);