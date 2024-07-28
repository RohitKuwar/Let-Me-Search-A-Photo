import React, { useEffect, useState, useCallback } from "react";
import { getImages, searchImages } from "./API/api";
import Gallery from "./components/gallery/Gallery";
import SearchBox from "./components/searchbox/SearchBox";
import { debounce } from "./Utils/debounce";
import './App.css'

const App = () => {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleData = (data, error) => {
    if (data) {
      setImages(data);
      setError(null); // Clear error on successful data fetch
    } else if (error) {
      setError(error);
      setImages([]); // Clear images on error
    }
    setLoading(false);
  };

  const fetchImages = async (query) => {
    setLoading(true);
    const { data, error } = query.length > 0 ? await searchImages(query) : await getImages();
    handleData(data, error);
  };

  // Use useCallback to memoize the debounced function
  const debouncedFetchImages = useCallback(
    debounce((query) => {
      fetchImages(query);
    }, 500), // Adjust the debounce delay as needed
    []
  );

  useEffect(() => {
    debouncedFetchImages(search);
  }, [search, debouncedFetchImages]);

  return (
    <div>
      <h1>Photo Search App</h1>
      <SearchBox search={search} setSearch={setSearch} />
      <div className="photo-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading data</p>
        ) : images.length > 0 ? (
          <Gallery images={images} />
        ) : (
          <p>No photos found</p>
        )}
      </div>
    </div>
  );
};

export default App;
