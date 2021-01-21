import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const historyArr = [initial]
  const [history, setHistory] = useState(historyArr);

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory(prev => {
        // remove last element of history, don't use .pop
        const removedLatestMode = [...prev.slice(0, prev.length - 1)];
        return [...removedLatestMode, newMode];
      })
    } else {
      setHistory(prev => {
        return [
          ...prev,
          newMode
        ];
      })
    }
    // add newMode to history
    setMode(newMode);
  }

  function back() {
    setHistory(prev => {
      if (prev.length > 1) {
        const removedLatestMode = [...prev.slice(0, prev.length - 1)];
        // setMode to last element of updated history
        setMode(removedLatestMode.slice(-1)[0]);
        return removedLatestMode;
      } else {
        return prev;
      }
    })
  }

  return { mode, transition, back };
}