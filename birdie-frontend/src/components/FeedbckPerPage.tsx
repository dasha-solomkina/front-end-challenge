type FeedbackPerPageProps = {
  handlePageSize: (pageNumber: number) => void;
};

export default function FeedbackPerPage({
  handlePageSize,
}: FeedbackPerPageProps) {
  return (
    <div className="feedback-per-page">
      <button onClick={() => handlePageSize(10)}>10</button>
      <button onClick={() => handlePageSize(25)}>25</button>
      <button onClick={() => handlePageSize(100)}>100</button>
    </div>
  );
}
