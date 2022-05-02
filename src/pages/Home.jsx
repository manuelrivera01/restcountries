import React from 'react';
import CountriesList from '../component/CountriesList';
import Header from '../component/Header';
import SearchBar from '../component/SearchBar';

const Home = () => {
  return (
    <div>
      <Header />
      <SearchBar />
      <CountriesList />
    </div>
  );
};

export default Home;
