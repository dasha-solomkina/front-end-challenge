import Chart from './components/Chart';
import Search from './components/Search';
import FeedbackList from './components/FeedbackList';
import Pagination from './components/Pagination';
import { useState, useEffect } from 'react';
import fetchFeedbackList, {
  FeedbackListProps,
} from '../src/store/dataFeedback.ts';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [search, setSearch] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [fetchedFeedback, setFetchedFeedback] =
    useState<FeedbackListProps | null>(null);

  useEffect(() => {
    const url = `https://frontend-challenge.birdie.workers.dev/feedback?pageSize=100&page=${pageNumber}`;
    const fetchData = async () => {
      try {
        const data = await fetchFeedbackList(url);
        const feedbackWithId = data.data.map((item) => ({
          ...item,
          id: uuidv4(),
        }));
        setFetchedFeedback({
          ...data,
          data: feedbackWithId,
        });
        // setFetchedFeedback(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [pageNumber]);

  function handleNextPage() {
    const buttonPrev = document.querySelector('.page-back-btn');
    buttonPrev?.classList.add('active');
    if (
      fetchedFeedback?.nextPage &&
      Math.ceil(fetchedFeedback.count / 100) - fetchedFeedback.nextPage === 1
    ) {
      const buttonForward = document.querySelector('.page-forward-btn');
      buttonForward?.classList.remove('active');
      setPageNumber((prevPage) => prevPage + 1);
    }
    if (
      fetchedFeedback?.nextPage &&
      Math.ceil(fetchedFeedback.count / 100) - fetchedFeedback.nextPage > 1
    ) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  }

  function handlePreviousPage() {
    const buttonForward = document.querySelector('.page-forward-btn');
    buttonForward?.classList.add('active');

    if (fetchedFeedback && fetchedFeedback.previousPage !== null) {
      setPageNumber((prevPage) => prevPage - 1);
    }
    if (fetchedFeedback && fetchedFeedback.previousPage == 0) {
      const buttonPrev = document.querySelector('.page-back-btn');
      buttonPrev?.classList.remove('active');
    }
  }

  // function handleSearch(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();

  // }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <>
      <Chart />
      <Search
        // onSubmit={handle Search}
        handleInput={handleInput}
        search={search}
      />
      <Pagination
        page={pageNumber}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
      {fetchedFeedback ? (
        <FeedbackList fetchedFeedbackArray={fetchedFeedback.data} />
      ) : (
        <div className="loading">
          <div className="loading-img"></div>
          <p className="loading-message">Loading...</p>
        </div>
      )}
    </>
  );
}

export default App;
