type PaginationProps = {
  page: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
};

export default function Pagination({
  page,
  handlePreviousPage,
  handleNextPage,
}: PaginationProps) {
  return (
    <div className="pagination">
      <button onClick={handlePreviousPage} className="page-back-btn">
        &lt;
      </button>
      <p>{page}</p>
      <button onClick={handleNextPage} className="page-forward-btn active">
        &gt;
      </button>
    </div>
  );
}
