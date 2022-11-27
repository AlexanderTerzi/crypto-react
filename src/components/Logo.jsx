import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../assets/img/logo.svg'

const Logo = () => {
    const linkStyles = 'absolute top-[1.5rem] left-[1.5rem] [text-decoration:none] text-lg text-cyan flex items-center';

    return (
        <Link to='/' className={linkStyles}>
            <img src={logoImg} alt="Crypto" />
            <span>
                Crypto
            </span>
        </Link>
    );
};

export default Logo;