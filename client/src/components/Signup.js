import React from 'react';
import './css/Signup.css';
import signupImage from './images/signup.jpg';
import {connect} from 'react-redux'
import * as actions from '../actions'
import {Link} from "react-router-dom";

const Signup = (props) => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
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

        if(!email) {
            valid = false;
            errors['email'] = "Enter your email!";
        }

        if(!password) {
            valid = false;
            errors["password"] = "Enter your password!"
        }

        if(username.length < 5 && username.length >0) {
            valid = false;
            errors["username"] = "your name is too short"
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
                email:email,
                password: password
            }

            props.createNewUser(user)
        }
    }

    return (
        <div className={'signup'}>
            <div className="signup__container">
                <div className="signup__left">
                    <img src={signupImage} alt=""/>
                </div>
                <div className="signup__right">
                    <h1>Sign Up</h1>
                    {mongooError && <p style={{color: 'red'}}>{mongooError}</p>}
                    <form onSubmit={handleFormSubmit} className={'signup__form'}>
                        <div className="signup__formLine">
                            <label htmlFor="">User Name:</label>
                            <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder={'Name'}/>
                            {errors.username && <p style={{color: 'red'}}>{errors.username}</p>}
                        </div>
                        <div className="signup__formLine">
                            <label htmlFor="">E-mail:</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder={'E-mail'}/>
                            {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
                        </div>
                        <div className="signup__formLine">
                            <label htmlFor="">Password</label>
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder={'Password'}/>
                            {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
                        </div>
                        <div className="signup__formButtons">
                            <button className={'signup__formSubmit'}>Sign UP</button>
                            <div className="signup__login">
                                <p>Already Have account?</p>
                                <Link to={'/login'} className={'signup__formSignIn'}>Log In</Link>
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

export default connect(mapStateToProps, actions) (Signup);