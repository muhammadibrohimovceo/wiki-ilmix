import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Click outside to close predictions
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowPredictions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (query.trim().length === 0) {
        setPredictions([]);
        return;
      }
      
      try {
        // Use Wikipedia OpenSearch API for real predictions
        const res = await axios.get(
          `https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=5&origin=*`
        );
        // The API returns [search_term, [predictions], [descriptions], [links]]
        if (res.data && res.data[1]) {
          setPredictions(res.data[1]);
        }
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };

    // Debounce
    const timeoutId = setTimeout(() => {
      fetchPredictions();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = (searchQuery) => {
    const finalQuery = searchQuery || query;
    if (finalQuery.trim()) {
      setShowPredictions(false);
      navigate(`/search/${encodeURIComponent(finalQuery.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container" ref={wrapperRef}>
      <div className="search-box">
        <svg className="search-icon" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowPredictions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowPredictions(true)}
          placeholder="Search Wiki-ilmix..."
          autoComplete="off"
          autoFocus
        />
        <button className="search-button" onClick={() => handleSearch()}>
          <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
             <path d="m16 1.41-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z" opacity=".0"></path>
          </svg>
        </button>
      </div>

      {showPredictions && predictions.length > 0 && (
        <ul className="predictions-list">
          {predictions.map((pred, index) => (
            <li 
              key={index} 
              className="prediction-item"
              onClick={() => {
                setQuery(pred);
                handleSearch(pred);
              }}
            >
              <svg className="prediction-icon" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </svg>
              <span>{pred}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
