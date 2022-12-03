import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    const navStyles = 'w-[40%] mt-16 flex justify-around align-middle border border-cyan rounded-lg';
    const navLinkStyles = ({ isActive }) => {
        return `${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300 border-0 cursor-pointer rounded'} ease-in duration-200 w-full text-base text-center font-RobotoCondensed m-2.5 capitalize font-semibold`
    }

    return (
        <nav className={navStyles}>
            <NavLink to='/' className={navLinkStyles}>
                Crypto
            </NavLink>
            <NavLink to='/trending' className={navLinkStyles}>
                Trending
            </NavLink>
            <NavLink to='/saved' className={navLinkStyles}>
                Saved
            </NavLink>
        </nav>
    );
};

export default Navigation;