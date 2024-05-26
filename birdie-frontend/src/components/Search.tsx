type SearchProps = {
  handleSearch: (inputValue: string) => void;
};

import { useState } from 'react';

export default function Search({ handleSearch }: SearchProps) {
  const [typedInput, setTypedInput] = useState<string>('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(typedInput);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="search-bar">
        <img src="src/assets/search.png" alt="" />
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
