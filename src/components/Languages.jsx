import React, { useState, useRef, useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { selectLanguage, selectTranslations, setLang } from '../redux/slices/languageSlice';
import { selectTheme } from '../redux/slices/themeSlice';

import flagUA from '../assets/img/flag_ua.png';
import flagEN from '../assets/img/flag_en.png';

const Languages = () => {
    const dispatch = useDispatch();
    const t = useSelector(selectTranslations);

    const { darkTheme } = useSelector(selectTheme);
    const { supportedLangs, lang } = useSelector(selectLanguage);

    const [openLanguage, setOpenLanguage] = useState(false);
    const languageRef = useRef();

    const handleOpenLanguage = () => {
        setOpenLanguage(!openLanguage);
    };

    const handleOutsideClick = (e) => {
        if (!e.path.includes(languageRef.current)) {
            setOpenLanguage(false);
        };
    };

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
    }, []);

    const currentLang = lang;

    return (
        <div
            className="mx-6 relative flex justify-center uppercase cursor-pointer sm:ml-auto sm:mt-2"
            title={t.chooseLang}
            ref={languageRef}
            onClick={handleOpenLanguage}
        >
            <img
                className='h-[20px] mt-0.5 mr-2'
                src={`${currentLang == 'ua' ? flagUA : flagEN}`}
                alt="language" />
            <span className="languages__value">
                {currentLang}
            </span>
            <ul
                className={`absolute normal-case w-[132px] -right-[17px] mt-8 overflow-hidden rounded-md ease-in duration-200 ${darkTheme ? 'bg-gray-200' : `bg-dirty_white-200`} ${openLanguage ? "opacity-100 visible translate-y-[0px] " : "opacity-0 invisible -translate-y-[30px]"}`}>

                {Object.entries(supportedLangs).map(([code, name]) => (
                    <li
                        key={code}
                        className={`py-2 px-2 ${currentLang === code ? 'bg-cyan text-gray-300' : ''}`}
                        onClick={() => dispatch(setLang(code))}

                    >
                        {name}
                    </li>

                ))}
            </ul>
            <svg
                className={`ml-1 mt-2 ease-in duration-200 ${openLanguage ? 'rotate-0' : '-rotate-180'}`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                    fill={`${darkTheme ? 'white' : 'black'}`}
                />
            </svg>
        </div>
    );
};

export default Languages;