import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const historyArr = [initial];
  const [history, setHistory] = useState(historyArr);

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory((prev) => {
        const removedLatestMode = [...prev.slice(0, -1)];
        return [...removedLatestMode, newMode];
      });
    } else {
      setHistory((prev) => {
        return [...prev, newMode];
      });
    }
    setMode(newMode);
  }

  function back() {
    setHistory((prev) => {
      if (prev.length > 1) {
        const removedLatestMode = [...prev.slice(0, -1)];
        const lastModeInArray = slice(-1)[0];
        setMode(lastModeInArray);
        return removedLatestMode;
      } else {
        return prev;
      }
    });
  }

  return { mode, transition, back };
}
