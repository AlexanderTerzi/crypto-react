import React, { useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import { CryptoContext } from '../pages/Home';

import searchIcon from '../assets/img/search-icon.svg';
import Spinner from './UI/Spinner';

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef(null);

    const { searchData, getSearchResult, setCoinSearch, setSearchData } = useContext(CryptoContext);

    const handleSearch = debounce((val) => {
        getSearchResult(val);
    }, 1500);

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
        setCoinSearch(coin);
        setSearchValue('');
        setSearchData('');
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
    })

    return (
        <div className='relative'>
            <form
                className='w-96 relative flex items-center ml-7 font-RobotoCondensed'
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
                <button
                    className='absolute right-1 cursor-pointer'
                    type="submit"
                >
                    <img className='w-full h-auto' src={searchIcon} alt="search" />
                </button>
            </form>
            {
                searchValue.length > 0 && (
                    <ul className='absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100'>
                        {searchData
                            ? searchList
                            : <Spinner />}
                    </ul>
                )
            }
        </div>
    );
};

export default Search;