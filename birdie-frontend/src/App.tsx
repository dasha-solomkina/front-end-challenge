import Chart from './components/Chart';
import Search from './components/Search';
import Feedback from './components/Feedback';

function App() {
  return (
    <>
      <Chart />
      <Search />
      <div>
        <Feedback />
        <Feedback />
        <Feedback />
      </div>
    </>
  );
}

export default App;
