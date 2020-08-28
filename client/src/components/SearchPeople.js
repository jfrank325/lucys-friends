import React from 'react';

const SearchPeople = ({ query, search }) => {
  return (
    <div>
      <input type="text" placeholder="Search For Friends" value={query} onChange={search} />
    </div>
  );
};

export default SearchPeople;
