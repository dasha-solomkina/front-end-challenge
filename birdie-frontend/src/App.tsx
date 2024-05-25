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
import AddTagBtn from './components/AddTagBtn.tsx';
import TagsList from './components/TagsList.tsx';
import { TagProps } from './components/Tag.tsx';

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
    }
    if (fetchedFeedback && fetchedFeedback.previousPage == null) {
      buttonPrev?.classList.remove('active');
    }
    if (fetchedFeedback && fetchedFeedback.nextPage !== null) {
      buttonForward?.classList.add('active');
    }
    if (fetchedFeedback && fetchedFeedback.previousPage !== null) {
      buttonPrev?.classList.add('active');
    }
    if (
      fetchedFeedback?.nextPage &&
      Math.ceil(fetchedFeedback.count / pageSize) - fetchedFeedback.nextPage ===
        1
    ) {
      buttonForward?.classList.remove('active');
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

  const [tags, setTags] = useState<TagProps[]>([]);
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  const [buttonPosition, setButtonPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [highlightedText, setHighlightedText] = useState<string>('');

  function handleAddTag() {
    const newTag = { text: highlightedText, color: 'red', id: uuidv4() };
    const newTagsArr = [...tags, newTag];
    setTags(newTagsArr);
    setButtonVisible(false);
  }

  useEffect(() => {
    const handleMouse = () => {
      const selection = window.getSelection();

      if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setHighlightedText(selection.toString());
        setButtonPosition({
          left: rect.left + window.scrollX,
          top: rect.top + window.scrollY,
        });
        setButtonVisible(true);
      } else {
        setButtonVisible(false);
      }

      return () => {
        document.removeEventListener('mouseup', handleMouse);
      };
    };
    document.addEventListener('mouseup', handleMouse);
  }, []);

  return (
    <>
      <Chart />
      <Search handleSearch={handleSearch} />
      <Pagination
        page={pageNumber}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
      <TagsList tagsArray={tags} />
      <FeedbackPerPage handlePageSize={handlePageSize} />
      <AddTagBtn
        buttonVisible={buttonVisible}
        buttonPosition={buttonPosition}
        handleAddTag={handleAddTag}
      />

      {fetchedFeedback ? (
        <FeedbackList fetchedFeedbackArray={fetchedFeedback.data} />
      ) : (
        <div className="loading">
          <div className="loading-img"></div>
          <p className="loading-message">Loading...</p>
        </div>
      )}
      {fetchedFeedback?.data.length === 0 ? (
        <div className="notfound-group">
          <img id="notfound-img" src="src/assets/noresult.png" alt="" />
          <span className="notfound-title">No results found.</span>
          <span className="notfound-text">
            Make sure you've written your search correctly or review your
            filters selected.
          </span>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default App;
