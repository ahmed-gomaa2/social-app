import React from 'react';
import './css/Navbar.css'
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from '../actions'

const Navbar = (props) => {
    const [open, setOpen] = React.useState(false)

    const handleSidebarOut = () => setOpen(!open)

    const handleLogoutUser = () => props.logUserOut()
    return (
        <div className={'navbar'}>
            <div className="navbar__left">
                <Link to={'/'}>PostShare</Link>
            </div>
            <div className="navbar__right">
                <div className={`navbar__sidebar ${open && 'navbar__sidebarOut'}`}>
                    <div className="navbar__post">
                        <Link to={'/create/post'}>New Post</Link>
                    </div>
                    <div className="navbar__auth">
                        {props.user?.username ? (
                            <div onClick={handleLogoutUser} className="navbar__logout">Logout</div>
                        ) : ([
                            <Link to={'/signup'} className={'navbar__signup'}>Join</Link>,
                            <Link to={'/login'} className={'navbar__login'}>Login</Link>
                            ])}
                    </div>

                </div>
                <div onClick={handleSidebarOut} className={`header__menu ${open && 'active'}`}>
                    <div></div>
                    <div></div>
                    <div></div>
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

export default connect(mapStateToProps, actions) (Navbar);