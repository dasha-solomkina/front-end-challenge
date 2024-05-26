import { useState } from 'react';
import imgT from '../assets/search.png';

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
        <img src={imgT} alt="" />
        <input
          value={typedInput}
          type="text"
          placeholder="Search to discover"
          onChange={(e) => setTypedInput(e.target.value)}
        />
      </div>
      <button type="submit" className="search-btn">
        <img src="../assets/search-btn.png" alt="" />
      </button>
    </form>
  );
}
