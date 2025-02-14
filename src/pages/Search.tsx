import React, { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchPhotos } from '../features/searchSlice';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { photos, status, error } = useSelector((state: RootState) => state.search);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    dispatch(fetchPhotos(e.target.value));
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for photos..."
      />
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <ul>
          {photos.map((photo) => (
            <li key={photo.link}>
              <a href={photo.link}>
                <img src={photo.media.m} alt={photo.title} />
              </a>
              <p>Author: {photo.author}</p>
              <p>Tags: {photo.tags}</p>
            </li>
          ))}
        </ul>
      )}
      {status === 'failed' && <p>{error}</p>}
    </div>
  );
};

export default Search;
