import { useState } from 'react';
import imgSeachIcon from '../assets/search.png';
import imgSeachBtn from '../assets/search-btn.png';

type SearchProps = {
  handleSearch: (inputValue: string) => void;
};

export default function Search({ handleSearch }: SearchProps) {
  const [typedInput, setTypedInput] = useState<string>('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(typedInput);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="search-bar">
        <img src={imgSeachIcon} alt="" />
        <input
          value={typedInput}
          type="text"
          placeholder="Search to discover"
          onChange={(e) => setTypedInput(e.target.value)}
        />
      </div>
      <button type="submit" className="search-btn">
        <img src={imgSeachBtn} alt="" />
      </button>
    </form>
  );
}
