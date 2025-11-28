// src/GuitarContext.jsx
import React, { createContext, useContext, useState } from "react";

const GuitarContext = createContext();

export function GuitarProvider({ children }) {
  const [songTitle, setSongTitle] = useState("");
  const [songInfo, setSongInfo] = useState(null); 
  // { bpm, key, chords: [], difficulty }

  const value = {
    songTitle,
    setSongTitle,
    songInfo,
    setSongInfo,
  };

  return (
    <GuitarContext.Provider value={value}>
      {children}
    </GuitarContext.Provider>
  );
}

export function useGuitar() {
  return useContext(GuitarContext);
}
