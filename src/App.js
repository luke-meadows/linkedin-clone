import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import db from '../src/db/firebase';
import Feed from './components/Feed';
function App() {
  return (
    <div className="app">
      <Header />
      <div className="app__body">
        <SideBar />
        <Feed />
        <p
          style={{
            margin: ' 15px 0',
            border: ' 1px solid lightgray',
          }}
        >
          Widgets
        </p>
        {/* Feed */}
        {/* Widgets */}
      </div>
    </div>
  );
}

export default App;
