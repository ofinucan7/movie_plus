import React from 'react'
import SearchComponent from '../components/SearchComponent';
import Header from '../components/Header'

const Search = () => {
  return (
    <div>
      <Header isLoggedIn={true} />
      <SearchComponent />
    </div>
  )
}

export default Search