import React, { useCallback, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { fetchSearchResult, searchDataType, selectFilters, setCoinSearch, setSearchData } from '../redux/slices/filtersSlice';
import { selectTranslations } from '../redux/slices/languageSlice';
import { selectTheme } from '../redux/slices/themeSlice';

import debounce from 'lodash.debounce';

import Spinner from './UI/Spinner';

const Search: React.FC = () => {
    const dispatch = useAppDispatch();

    const t = useSelector(selectTranslations);
    const { searchData } = useSelector(selectFilters);
    const { darkTheme } = useSelector(selectTheme);

    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const getSearchResult = async (query: string) => {
        dispatch(fetchSearchResult(query))
    };

    const handleSearch = useCallback(debounce(function (val) {
        getSearchResult(val);
    }, 2000), []);

    const handleChangeInput = () => {
        const query = inputRef.current?.value;

        if (query) {
            setSearchValue(query);
            handleSearch(query);
        }
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        handleSearch(searchValue);
    }

    const selectCoin = (coin: string) => {
        dispatch(setCoinSearch(coin));
        setSearchValue('');
        dispatch(setSearchData(''));
    };

    const searchList = searchData && searchData.map((item: searchDataType) => {
        return (
            <li
                key={item.id}
                className='flex items-center ml-4 my-2 cursor-pointer'
                onClick={() => selectCoin(item.id)}
            >
                <img
                    className='w-[1rem] h-[1rem] mx-1.5'
                    src={item.thumb}
                    alt={item.name}
                />
                <span>
                    {item.name}
                </span>
            </li>
        )
    });

    const clearResult = () => {
        setSearchValue('');
        dispatch(setSearchData(''));
    }

    return (
        <div className='relative'>
            <form
                className='w-96 xl:w-72 lg:w-[85%] sm:w-[80%] ssm:w-[70%] relative flex items-center ml-7 font-RobotoCondensed'
                onSubmit={handleSubmit}
            >
                <input
                    className={`${darkTheme ? 'bg-gray-200 focus:border-cyan' : 'bg-dirty_white-100'} w-full rounded placeholder:text-gray-100 pl-3 outline-0 border border-transparent ease-in duration-200 ssm:text-[14px]`}
                    placeholder={t.searchPlaceholder}
                    type='text'
                    name='search'
                    value={searchValue}
                    ref={inputRef}
                    onChange={handleChangeInput}
                />
                {searchData && <button
                    className='absolute right-8 cursor-pointer'
                    onClick={clearResult}>
                    <svg
                        className="search__clear h-4 w-4"
                        viewBox="0 0 20 20"
                        fill={`${darkTheme ? 'cyan' : '#333'}`}
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                    </svg>
                </button>}
                <button
                    className='absolute right-1 cursor-pointer'
                    type="submit"
                >
                    <svg
                        className={`w-full h-auto mt-[2px]`}
                        width={24}
                        height={24}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8Zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6Z"
                            fill={`${darkTheme ? 'cyan' : '#333'}`}
                        />
                    </svg>
                </button>
            </form>
            {
                searchValue.length > 0 && (
                    <ul className={`${darkTheme ? 'bg-gray-200' : 'bg-dirty_white-200'} absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 xl:w-72 lg:w-[85%] sm:w-[80%] ssm:w-[70%] lg:left-[30px] z-50`}>
                        {searchData
                            ? searchList
                            : <Spinner classes={'w-full h-full flex justify-center flex-col items-center'} />}
                        {
                            searchList.length === 0 && (
                                <span className='w-full h-full flex justify-center flex-col items-center'>
                                    {t.searchNoResult}
                                </span>
                            )
                        }
                    </ul>
                )
            }

        </div >
    );
};

export default Search;