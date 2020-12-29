import { current } from "@reduxjs/toolkit";
import { useCallback, useEffect, useReducer } from "react";

const keysReducer = (state, action) => {
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

export const excludeInputTarget = { nodeName: "INPUT" }

type targetSpec = {
  [key: string]: string
}

export const useKeyboardShortcut = (
  shortcutKeys: string[],
  callback: () => void,
  excludeTargets: targetSpec = excludeInputTarget,
) => {
  const initialKeyMapping = shortcutKeys.reduce((currentKeys, key) => {
    currentKeys[key] = false;
    return currentKeys;
  }, {})

  const [keys, setKeys] = useReducer(keysReducer, initialKeyMapping)

  const targetMatchesSpec = (target, spec) => (
    !!Object.keys(spec).find((key) => target[key] === spec[key])
  )

  const keydownListener = useCallback(event => {
    const { key, target, repeat } = event;
    if (repeat) return;
    if (excludeTargets && targetMatchesSpec(target, excludeTargets)) return;
    if (!shortcutKeys.includes(key)) return;
    if (!keys[key]) {
      setKeys({ type: 'set-key-down', key })
    }
  }, [shortcutKeys, keys])

  const keyupListener = useCallback(event => {
    const { key, target, repeat } = event;
    if (repeat) return;
    if (excludeTargets && targetMatchesSpec(target, excludeTargets)) return;
    if (!shortcutKeys.includes(key)) return;

    if (keys[key]) {
      setKeys({ type: 'set-key-up', key })
    }
  }, [shortcutKeys, keys])
  
  useEffect(() => {
    window.addEventListener("keydown", keydownListener, true)
    return () => {
      window.removeEventListener("keydown", keydownListener, true)
    }
  }, [keydownListener])

  useEffect(() => {
    window.addEventListener("keyup", keyupListener, true);
    return () => {
      window.removeEventListener("keyup", keyupListener, true)
    }
  }, [keyupListener])

  useEffect(() => {
    if (Object.values(keys).some(e => e)) {
      callback()
    }
  }, [callback, keys])
}