import { current } from "@reduxjs/toolkit";
import { useCallback, useEffect, useReducer } from "react";

const keysReducer = (state, action) => {
  console.log('reducer called!');
  switch (action.type) {
    case "set-key-down":
      const keydownState = { ...state, [action.key]: true };
      return keydownState;
    case "set-key-up":
      const keyUpState = { ...state, [action.key]: false };
      return keyUpState;
    default:
      return state;
  }
};

export const useKeyboardShortcut = (
  shortcutKeys: string[],
  callback: () => void
) => {
  const initialKeyMapping = shortcutKeys.reduce((currentKeys, key) => {
    currentKeys[key] = false;
    return currentKeys;
  }, {})

  const [keys, setKeys] = useReducer(keysReducer, initialKeyMapping)

  const keydownListener = useCallback(event => {
    const { key, repeat } = event;
    if (repeat) return;
    if (!shortcutKeys.includes(key)) return;
    if (!keys[key]) {
      console.log('set keys');
      setKeys({ type: 'set-key-down', key })
    }
  }, [shortcutKeys, keys])

  const keyupListener = useCallback(event => {
    const { key, repeat } = event;
    if (repeat) return;
    if (!shortcutKeys.includes(key)) return;

    if (keys[key]) {
      console.log('set keys');
      setKeys({ type: 'set-key-up', key })
    }
  }, [shortcutKeys, keys])
  
  useEffect(() => {
    window.addEventListener("keydown", keydownListener, true)
    console.log(shortcutKeys, keys, keydownListener)
    console.log('binding')
    return () => {
      console.log('cleanup')
      window.removeEventListener("keydown", keydownListener, true)
    }
  }, [keydownListener])

  useEffect(() => {
    window.addEventListener("keyup", keyupListener, true);
    return () => window.removeEventListener("keydown", keyupListener, true)
  }, [keyupListener])

  useEffect(() => {
    if (!Object.values(keys).filter(value => !value).length) {
      callback()
    }
  }, [callback, keys])
}