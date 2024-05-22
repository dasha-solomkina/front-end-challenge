export default function Search() {
  return (
    <form>
      <div className="search-bar">
        <img src="src/assets/search.png" alt="" />
        <input type="text" placeholder="Search to discover" />
      </div>
      <button className="search-btn">
        <img src="src/assets/search-btn.png" alt="" />
      </button>
    </form>
  );
}
