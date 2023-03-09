import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [fetch, setFetch] = useState(true);

  const globalStates = {
    search,
    setSearch,
    selected,
    setSelected,
    fetch,
    setFetch
  };

  return (
    <GlobalContext.Provider value={globalStates}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
