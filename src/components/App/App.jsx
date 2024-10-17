import { useState } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import './App.css';
import { fetchGallery } from '../../gallery-api';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

export default function App() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  async function handleSearch(searchValue, page = 1) {
    try {
      setError(false);
      setLoading(true);

      if (page === 1) {
        setGallery([]);
        setSearchValue(searchValue);
      }

      const galleryData = await fetchGallery(searchValue, page);
      const galleryResults = galleryData.results;
      setTotalPages(galleryData.total_pages);

      if (page > 1) {
        setGallery(prevPage => {
          return [...prevPage, ...galleryResults];
        });
      } else {
        setGallery(galleryResults);
      }

      setCurrentPage(page);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage />}

      {gallery.length > 0 && <ImageGallery gallery={gallery} />}

      {gallery.length > 0 && !loading && currentPage < totalPages && (
        <LoadMoreBtn
          onClick={handleSearch}
          page={currentPage}
          searchValue={searchValue}
        />
      )}

      {loading && <Loader />}
    </>
  );
}
