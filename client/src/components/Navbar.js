import React from 'react';
import './css/Navbar.css'
import {Link} from "react-router-dom";

const Navbar = () => {
    const [open, setOpen] = React.useState(false)

    const handleSidebarOut = () => setOpen(!open)
    return (
        <div className={'navbar'}>
            <div className="navbar__left">
                <h1>PostShare</h1>
            </div>
            <div className="navbar__right">
                <div className={`navbar__sidebar ${open && 'navbar__sidebarOut'}`}>
                    <div className="navbar__post">
                        <Link to={'/create/post'}>New Post</Link>
                    </div>
                    <div className="navbar__auth">
                        <Link to={'/signup'} className={'navbar__signup'}>Join</Link>
                        <Link to={'/login'} className={'navbar__login'}>Login</Link>
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

export default Navbar;