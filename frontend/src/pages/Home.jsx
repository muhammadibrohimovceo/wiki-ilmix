import React from 'react';
import SearchBar from '../components/SearchBar';

const Home = () => {
  return (
    <div className="home-page">
      <div className="logo-container">
        <h1 className="logo">Wiki-ilmix</h1>
      </div>
      <SearchBar />
    </div>
  );
};

export default Home;
