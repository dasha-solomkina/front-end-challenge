type PaginationProps = {
  currentPage: number;
  lastPage: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
};

export default function Pagination({
  currentPage,
  lastPage,
  handlePreviousPage,
  handleNextPage,
}: PaginationProps) {
  return (
    <div className="pagination">
      <button
        onClick={handlePreviousPage}
        className={`page-back-btn ${currentPage === 0 ? '' : 'active'}`}
      >
        &lt;
      </button>
      <p>{currentPage + 1}</p>
      <button
        onClick={handleNextPage}
        className={`page-forward-btn ${
          currentPage + 2 >= lastPage ? '' : 'active'
        }`}
      >
        &gt;
      </button>
    </div>
  );
}
