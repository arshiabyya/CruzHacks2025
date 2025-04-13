import React, { useState } from 'react';
import axios from 'axios';

function SearchDoctors() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors/search?keyword=${keyword}");
      setResults(res.data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <div>
      <h2>Search Doctors</h2>
      <input 
        type="text" 
        placeholder="Search by name or specialty" 
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {results.map(doc => (
        <div key={doc._id} className="result-card">
          <h4>{doc.name}</h4>
          <p>{doc.specialty}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchDoctors;