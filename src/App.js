import React, { useEffect, useState } from "react";
import { getImages, searchImages } from "./API/api";
import Gallery from "./components/gallery/Gallery";
import SearchBox from "./components/searchbox/SearchBox";
import DarkThemeIcon from "./components/dark-theme/DarkThemeIcon";
import './App.css'

const App = () => {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');
  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    const toggle = theme === 'light' ? setMode('dark') : setMode('light');
    return toggle;
  };

  const handleData = (data, error) => {
    setLoading(true);
    if (data) {
      setImages(data);
    } else if (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    setTheme(localTheme);
  }, []);

  useEffect(() => {
    const getImageData = async () => {
    const { data, error } = await getImages();
    handleData(data, error);
  };
  const searchImageData = async (search) => {
    const { data, error } = await searchImages(search);
    handleData(data, error);
  };
    (() => {
      if (search.length > 0) {
        searchImageData(search);
      } else {
        getImageData();
      }
    })()
  }, [search])

  return (
    <div
      data-theme={theme}
      style={{ background: theme === 'light' ? 'white' : 'black' }}
    >
      <DarkThemeIcon theme={theme} themeToggleHandler={themeToggler} />
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
