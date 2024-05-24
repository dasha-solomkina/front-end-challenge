type SearchProps = {
  search: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Search({ search, handleInput }: SearchProps) {
  return (
    <form>
      <div className="search-bar">
        <img src="src/assets/search.png" alt="" />
        <input
          value={search}
          type="text"
          placeholder="Search to discover"
          onChange={(e) => handleInput(e)}
        />
      </div>
      <button type="submit" className="search-btn">
        <img src="src/assets/search-btn.png" alt="" />
      </button>
    </form>
  );
}
