import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import db from '../src/db/firebase';
import Feed from './components/Feed';
import NewsWidget from './components/NewsWidget';
function App() {
  return (
    <div className="app">
      <Header />
      <div className="app__body">
        <SideBar />
        <Feed />
        <NewsWidget />
      </div>
    </div>
  );
}

export default App;
