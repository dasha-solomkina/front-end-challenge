import { useState } from 'react';

type FeedbackPerPageProps = {
  handlePageSize: (pageNumber: number) => void;
};

export default function FeedbackPerPage({
  handlePageSize,
}: FeedbackPerPageProps) {
  const [activeButon, setActiveSutton] = useState<number>(10);

  const handleClick = (size: number) => {
    setActiveSutton(size);
    handlePageSize(size);
  };

  return (
    <div className="feedback-per-page">
      <button
        onClick={() => handleClick(10)}
        className={activeButon === 10 ? 'active' : ''}
      >
        10
      </button>
      <button
        onClick={() => handleClick(25)}
        className={activeButon === 25 ? 'active' : ''}
      >
        25
      </button>
      <button
        onClick={() => handleClick(100)}
        className={activeButon === 100 ? 'active' : ''}
      >
        100
      </button>
    </div>
  );
}
