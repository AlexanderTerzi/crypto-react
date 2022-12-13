import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logoImg from '../assets/img/logo.svg'

const Logo = () => {
    const { darkTheme } = useSelector(state => state.theme);

    const linkStyles = `${darkTheme ? 'text-cyan' : 'text-gray-300'} absolute top-[1.5rem] left-[1.5rem] [text-decoration:none] text-lg flex items-center`;

    return (
        <Link to='/' className={linkStyles}>
            <img src={logoImg} alt="Crypto" />
            <span>
                Crypto 24/7
            </span>
        </Link>
    );
};

export default Logo;