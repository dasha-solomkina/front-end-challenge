import Chart from './components/Chart';
import Search from './components/Search';
import FeedbackList from './components/FeedbackList';
import Pagination from './components/Pagination';
import { useState, useEffect } from 'react';
import fetchFeedbackList, {
  FeedbackListProps,
} from '../src/store/dataFeedback.ts';
import { v4 as uuidv4 } from 'uuid';
import FeedbackPerPage from './components/FeedbckPerPage.tsx';

function App() {
  const [search, setSearch] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  function handlePageSize(num: number) {
    setPageSize(num);
    setPageNumber(0);
    const buttonPrev = document.querySelector('.page-back-btn');
    buttonPrev?.classList.remove('active');
  }

  const [fetchedFeedback, setFetchedFeedback] =
    useState<FeedbackListProps | null>(null);

  useEffect(() => {
    const url = `https://frontend-challenge.birdie.workers.dev/feedback?pageSize=${pageSize}&page=${pageNumber}&search=${search}`;
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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [pageNumber, search, pageSize]);

  useEffect(() => {
    const buttonForward = document.querySelector('.page-forward-btn');
    const buttonPrev = document.querySelector('.page-back-btn');

    if (fetchedFeedback && fetchedFeedback.count / pageSize < 1) {
      buttonForward?.classList.remove('active');
      buttonPrev?.classList.remove('active');
    } else if (
      fetchedFeedback?.nextPage &&
      Math.ceil(fetchedFeedback.count / pageSize) - fetchedFeedback.nextPage ===
        1
    ) {
      buttonForward?.classList.remove('active');
    } else if (fetchedFeedback && fetchedFeedback.previousPage == null) {
      buttonPrev?.classList.remove('active');
    } else {
      buttonForward?.classList.add('active');
      buttonPrev?.classList.add('active');
    }
  }, [fetchedFeedback, pageSize]);

  function handleNextPage() {
    if (
      fetchedFeedback?.nextPage &&
      Math.ceil(fetchedFeedback.count / pageSize) - fetchedFeedback.nextPage > 1
    ) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  }

  function handlePreviousPage() {
    if (fetchedFeedback && fetchedFeedback.previousPage !== null) {
      setPageNumber((prevPage) => prevPage - 1);
    }
  }

  function handleSearch(inputValue: string) {
    setSearch(inputValue);
    setPageNumber(0);
  }

  return (
    <>
      <Chart />
      <Search handleSearch={handleSearch} />
      <Pagination
        page={pageNumber}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
      <FeedbackPerPage handlePageSize={handlePageSize} />
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
