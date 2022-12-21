import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from "react-redux";
import { selectTranslations } from '../redux/slices/languageSlice';

const NotFound: React.FC = () => {
    const t = useSelector(selectTranslations);

    return (
        <div className="w-[100%] h-[100%] flex items-center justify-center flex-col absolute">
            <svg
                className='mb-2'
                height={32}
                width={32}
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g fill="cyan">
                    <circle cx={7.5} cy={5.5} r={0.5} />
                    <circle cx={5.5} cy={5.5} r={0.5} />
                    <circle cx={3.5} cy={5.5} r={0.5} />
                    <path d="M30.5 8h-29a.5.5 0 0 1 0-1h29a.5.5 0 0 1 0 1z" />
                    <path d="M29.5 29h-27c-.827 0-1.5-.673-1.5-1.5v-23C1 3.673 1.673 3 2.5 3h27c.827 0 1.5.673 1.5 1.5v23c0 .827-.673 1.5-1.5 1.5zM2.5 4a.5.5 0 0 0-.5.5v23a.5.5 0 0 0 .5.5h27a.5.5 0 0 0 .5-.5v-23a.5.5 0 0 0-.5-.5h-27z" />
                </g>
                <g fill="cyan">
                    <path d="M24.5 24a.5.5 0 0 1-.5-.5V21h-3.5a.5.5 0 0 1-.471-.668l2.5-7A.5.5 0 0 1 23 13h1.5a.5.5 0 0 1 .5.5V20h.5a.5.5 0 0 1 0 1H25v2.5a.5.5 0 0 1-.5.5zm-3.291-4H24v-6h-.647l-2.144 6zM10.5 24a.5.5 0 0 1-.5-.5V21H6.5a.5.5 0 0 1-.471-.668l2.5-7A.5.5 0 0 1 9 13h1.5a.5.5 0 0 1 .5.5V20h.5a.5.5 0 0 1 0 1H11v2.5a.5.5 0 0 1-.5.5zm-3.291-4H10v-6h-.647l-2.144 6zM17.5 24h-3c-.827 0-1.5-.673-1.5-1.5v-8c0-.827.673-1.5 1.5-1.5h3c.827 0 1.5.673 1.5 1.5v8c0 .827-.673 1.5-1.5 1.5zm-3-10a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-3z" />
                </g>
            </svg>
            <h1>
                {t.page404Title}
            </h1>
            <Link to='/' className='bg-cyan w-[200px] text-gray-300 py-1 mt-6 flex items-center justify-center text-[16px] hover:bg-gray-100 ease-in duration-200'>
                {t.page404Button}
            </Link>
        </div>
    );
};

export default NotFound;