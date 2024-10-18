import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick, page, searchValue }) {
  function handleLoadMore() {
    page = page + 1;

    onClick(searchValue, page);
  }

  return (
    <button className={css.loadMoreBtn} onClick={handleLoadMore} type="button">
      Load more
    </button>
  );
}
