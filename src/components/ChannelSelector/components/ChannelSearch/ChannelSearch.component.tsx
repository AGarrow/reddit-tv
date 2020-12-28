import React, { useCallback, useState, useRef } from 'react'
import axios from 'axios';
import { addSyntheticLeadingComment } from 'typescript';
import { useKeyboardShortcut } from '../../../../utils';

type ChannelSearchProps = {
  addChannel: (channelId: string) => void;
}

export const ChannelSearch = ({ addChannel }: ChannelSearchProps) => {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(true)
  const searchRef = useRef(null);

  const subredditSearch = async (event) => {
    const value = event.target.value;
    const response = await axios.get(
      `https://www.reddit.com/api/subreddit_autocomplete.json?query=${value}`
    ).then(
      (value) => { setResults(value.data.subreddits) }
    );
  }

  const focusSearch = useCallback(() => {
    searchRef.current.focus()
  }, [searchRef])

  const leaveFocus = useCallback(() => {
    searchRef.current.blur()
  }, [searchRef])

  useKeyboardShortcut(['t', 'T'], focusSearch)
  useKeyboardShortcut(['Escape'], leaveFocus)

  return (
    <div className="channelSearch">
      <input
        type="text"
        ref={searchRef}
        placeholder="Search"
        onChange={subredditSearch}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
      />
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