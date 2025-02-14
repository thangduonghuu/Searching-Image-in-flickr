import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFlickrSearch } from "../api/photo";
import { RootState } from "../app/store";
import { setQuery } from "../features/searchSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.search.query);
  const images = useSelector((state: RootState) => state.search.results);
  const { data, isLoading, error } = useFlickrSearch(query);


  console.log(data);
  return (
    <div>
      <input
        type="text"
        placeholder="Search Flickr..."
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching images</p>}
      <div>
        {data?.items?.map((image, index) => (
          <div key={index}>
            <a href={image.link} target="_blank" rel="noopener noreferrer">
              <img src={image.media.m} alt={image.title} />
            </a>
            <p>Author: {image.author}</p>
            <p>Tags: {image.tags}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
