import React, { useCallback, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResult, setCoinSearch, setSearchData } from '../redux/slices/filtersSlice';

import debounce from 'lodash.debounce';

import searchIcon from '../assets/img/search-icon.svg';
import Spinner from './UI/Spinner';

const Search = () => {
    const dispatch = useDispatch();

    const { searchData } = useSelector(state => state.filters);

    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef(null);

    const getSearchResult = async (query) => {
        dispatch(fetchSearchResult(query))
    };

    const handleSearch = useCallback(debounce(function (val) {
        getSearchResult(val);
    }, 2000), []);

    const handleChangeInput = () => {
        const query = inputRef.current.value;

        setSearchValue(query);
        handleSearch(query);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchValue);
    }

    const selectCoin = (coin) => {
        dispatch(setCoinSearch(coin));
        setSearchValue('');
        dispatch(setSearchData(''));
    };

    const searchList = searchData && searchData.map((item) => {
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
                    className='w-full rounded bg-gray-200 placeholder:text-gray-100 pl-3 outline-0 border border-transparent focus:border-cyan ease-in duration-200'
                    placeholder='Search...'
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
                        fill='cyan'
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                    </svg>
                </button>}
                <button
                    className='absolute right-1 cursor-pointer'
                    type="submit"
                >
                    <img className='w-full h-auto mt-[2px]' src={searchIcon} alt="search" />
                </button>
            </form>
            {
                searchValue.length > 0 && (
                    <ul className='absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100'>
                        {searchData
                            ? searchList
                            : <Spinner classes={'w-full h-full flex justify-center flex-col items-center'} />}
                        {
                            searchList.length === 0 && (
                                <span className='w-full h-full flex justify-center flex-col items-center'>
                                    No results
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