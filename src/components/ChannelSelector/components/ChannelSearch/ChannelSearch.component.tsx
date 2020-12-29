import React, { useCallback, useState, useRef, useEffect } from 'react'
import axios from 'axios';
import { useKeyboardShortcut, useListSelector } from '../../../../utils';

type ChannelSearchProps = {
  addChannel: (channelId: string) => void;
}

export const ChannelSearch = ({ addChannel }: ChannelSearchProps) => {
  const [searchQuery, setSearchQuery] = useState();
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(true)
  const searchRef = useRef(null);
  const [currentSelection, setCurrentSelection] = useState()

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

  const setSelectedByIndex = (index) => {
    setCurrentSelection(results[index]?.name)  
  }
  const { next, previous, reset } = useListSelector(-1, results, setSelectedByIndex)

  const addCurrentSelection = useCallback(() => {
    searchRef.current.value = null;
    leaveFocus();
    if (currentSelection != null) {
      addChannel(currentSelection)
    }
  }, [currentSelection])

  useEffect(() => {
    reset()
  }, [results])

  useKeyboardShortcut(['Enter'], addCurrentSelection, null)
  useKeyboardShortcut(['ArrowDown'], next, null)
  useKeyboardShortcut(['ArrowUp'], previous, null)
  useKeyboardShortcut(['t', 'T'], focusSearch)
  useKeyboardShortcut(['Escape'], leaveFocus, null)

  return (
    <div className="channelSearch">
      <input
        type="text"
        ref={searchRef}
        placeholder="Search"
        value={searchQuery}
        onChange={subredditSearch}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
      />
      <ul className={showResults ? null : "hide"}>
        {
          results.map((r) => (
            <li key={r.name} className={r.name === currentSelection ? "current" : null}>
              <button
                onClick={
                  () => {
                    addChannel(r.name);
                    setShowResults(false);
                  }
                }
              >
                {r.name}
              </button>
            </li>
          ))
        }
      </ul>
      
    </div>
  )
}