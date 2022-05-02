import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (search === '') {
      navigate('/');
    } else {
      navigate(`/search/${search}`);
    }
  };
  return (
    <div className='my-11'>
      <form onSubmit={handleSubmit} className='flex justify-center '>
        <label htmlFor='search' className='text-gray-700 font-bold'>
          Country
        </label>
        <input
          type='text'
          placeholder='Type country name'
          className='shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-2'
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className='px-4 py-2 font-semibold text-sm bg-sky-500 hover:bg-sky-600 text-white rounded-md shadow-md'>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
