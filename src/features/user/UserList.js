import React, { useState, useEffect } from 'react';

// ROUTING
import { Link } from 'react-router-dom';

// COMPONENTS
import UserCard from './UserCard';
import SearchError from '../../components/SearchError';

// ----------------------------------------------------------------------------------
// ------------------------------------ USER LIST -----------------------------------
// ----------------------------------------------------------------------------------

const UserList = ({ searchTerm, handleClearSearchBar, users }) => {
  const [searchResults, setSearchResults] = useState([]);

  // User search function
  useEffect(() => {
    const results = users.filter(user =>
      // Accounts for accented letters
      user.username.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
    );
    setSearchResults(results);
  }, [searchTerm, users]);

  return (
    <>
      {searchResults.length === 0 && searchTerm !== '' ? (
        <SearchError searchTerm={searchTerm} />
      ) : (
        <div className='grid justify-center gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {/* USER LIST */}
          {searchResults.map((i) => (
            <Link
              key={i.id}
              to={`/${i.username}`}
              onClick={handleClearSearchBar}
            >
              <UserCard
                key={i.id}
                data={i}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default UserList;