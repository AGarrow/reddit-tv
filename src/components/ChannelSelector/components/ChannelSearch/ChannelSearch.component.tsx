import React, { useState } from 'react'
import axios from 'axios';
import { addSyntheticLeadingComment } from 'typescript';

type ChannelSearchProps = {
  addChannel: (channelId: string) => void;
}

export const ChannelSearch = ({ addChannel }: ChannelSearchProps) => {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(true)

  const subredditSearch = async (event) => {
    const value = event.target.value;
    const response = await axios.get(
      `https://www.reddit.com/api/subreddit_autocomplete.json?query=${value}`
    ).then(
      (value) => { setResults(value.data.subreddits) }
    );
  }

  return (
    <div className="channelSearch">
      <input
        type="text"
        placeholder="Search"
        onChange={subredditSearch}
        onFocus={() => setShowResults(true)} /
      >
      <ul className={showResults ? null : "hide"}>
        {
          results.map((r) => (
            <li key={r.name}>
              <button onClick={
                () => {
                  addChannel(r.name)
                  setShowResults(false);
                }
              }>
                {r.name}
              </button>
            </li>
          ))
        }
      </ul>
      
    </div>
  )
}