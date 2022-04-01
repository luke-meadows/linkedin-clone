import '../styles/Search.css';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export default function Search() {
  let timeout = null;
  const [input, setInput] = useState('');

  function searchUsers() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log(input);
    }, 1000);
  }

  return (
    <div>
      <div className="search">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            searchUsers(e);
          }}
        />
      </div>
    </div>
  );
}
