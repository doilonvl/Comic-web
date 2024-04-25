import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    fontSize: "16",
    fontFamily: "Arial",
    backgroundColor: "#ffffff",
  });

  return (
    <AppContext.Provider value={{ settings, setSettings }}>
      {children}
    </AppContext.Provider>
  );
};
