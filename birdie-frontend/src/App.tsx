import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import fetchFeedbackList, {
  FeedbackListProps,
} from '../src/store/dataFeedback.ts';
import { COLORS, getRandomColor } from './store/colors.ts';

import Chart from './components/Chart';
import Search from './components/Search';
import FeedbackList from './components/FeedbackList';
import Pagination from './components/Pagination';
import FeedbackPerPage from './components/FeedbckPerPage.tsx';
import AddTagBtn from './components/AddTagBtn.tsx';
import TagsList from './components/TagsList.tsx';
import { TagProp } from './components/Tag.tsx';
import ImgNotFound from './assets/noresult.png';

function App() {
  const [search, setSearch] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [fetchedFeedback, setFetchedFeedback] =
    useState<FeedbackListProps | null>(null);
  const [tags, setTags] = useState<TagProp[]>([]);
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  const [buttonPosition, setButtonPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [highlightedText, setHighlightedText] = useState<string>('');
  const [availableColors, setAvailableColors] = useState<string[]>(
    COLORS.slice()
  );
  const [activeSearchTag, setActiveSearchTag] = useState<string>('');

  const handlePageSize = useCallback((num: number) => {
    setPageSize(num);
    setPageNumber(0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFeedbackList({
          search,
          page: pageNumber,
          pageSize,
        });
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

  const handleNextPage = useCallback(() => {
    if (fetchedFeedback && fetchedFeedback.nextPage !== null) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  }, [fetchedFeedback]);

  const handlePreviousPage = useCallback(() => {
    if (fetchedFeedback && fetchedFeedback.previousPage !== null) {
      setPageNumber((prevPage) => prevPage - 1);
    }
  }, [fetchedFeedback]);

  const handleSearch = useCallback((inputValue: string) => {
    setSearch(inputValue);
    setPageNumber(0);
  }, []);

  const handleSearchByTag = useCallback(
    (inputValue: string, id: string) => {
      if (activeSearchTag === '') {
        setSearch(inputValue);
        setPageNumber(0);
        setActiveSearchTag(id);
      } else if (activeSearchTag === id) {
        setSearch('');
        setPageNumber(0);
        setActiveSearchTag('');
      } else {
        setSearch(inputValue);
        setPageNumber(0);
        setActiveSearchTag(id);
      }
    },
    [activeSearchTag]
  );

  const handleAddTag = useCallback(() => {
    const existingTag = tags.find((tag) => tag.text === highlightedText);

    if (existingTag) {
      alert('Tag already exists');
      return;
    }
    let color;
    if (availableColors.length > 0) {
      color = availableColors.pop()!;
    } else {
      color = getRandomColor();
    }

    const newTag = {
      text: highlightedText,
      color: color,
      id: uuidv4(),
    };
    const newTagsArr = [...tags, newTag];
    setTags(newTagsArr);
    setButtonVisible(false);
  }, [availableColors, highlightedText, tags]);

  const handleDeleteTag = useCallback(
    (id: string) => {
      const updatedTags = tags.filter((tag) => tag.id !== id);
      setTags(updatedTags);

      const deletedTag = tags.find((tag) => tag.id === id);
      if (deletedTag) {
        setAvailableColors((prevColors) => [...prevColors, deletedTag.color]);
      }
    },
    [tags]
  );

  useEffect(() => {
    const handleMouse = () => {
      const selection = window.getSelection();

      if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        if (
          range.commonAncestorContainer.parentElement?.className ===
          'feedback-text'
        ) {
          setHighlightedText(selection.toString());
          setButtonPosition({
            left: rect.left + rect.width / 2 - 37 + window.scrollX,
            top: rect.top - 40 + window.scrollY,
          });
          setButtonVisible(true);
        }
      } else {
        setButtonVisible(false);
      }
    };
    document.addEventListener('mouseup', handleMouse);
    return () => {
      document.removeEventListener('mouseup', handleMouse);
    };
  }, []);

  const lastPage = fetchedFeedback
    ? Math.ceil(fetchedFeedback.count / pageSize)
    : 1;

  return (
    <>
      <Chart />
      <Search handleSearch={handleSearch} />
      <div className="pages-block">
        <Pagination
          currentPage={pageNumber}
          lastPage={lastPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
        <FeedbackPerPage handlePageSize={handlePageSize} />
      </div>

      <TagsList
        activeSearchTag={activeSearchTag}
        handleSearchByTag={handleSearchByTag}
        handleDeleteTag={handleDeleteTag}
        tagsArray={tags}
      />
      <AddTagBtn
        buttonVisible={buttonVisible}
        buttonPosition={buttonPosition}
        handleAddTag={handleAddTag}
      />

      {fetchedFeedback ? (
        <FeedbackList fetchedFeedbackArray={fetchedFeedback.data} tags={tags} />
      ) : (
        <div className="loading">
          <div className="loading-img"></div>
          <p className="loading-message">Loading...</p>
        </div>
      )}
      {fetchedFeedback?.data.length === 0 ? (
        <div className="notfound-group">
          <img id="notfound-img" src={ImgNotFound} alt="" />
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
