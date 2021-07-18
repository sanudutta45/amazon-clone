import React, { createContext, useContext, useReducer } from "react";

//prepare the data layer
export const Context = createContext();

//wrap our app and provider the data layer
export const ContextProvider = ({ reducer, initialState, children }) => {
  return (
    <Context.Provider value={useReducer(reducer, initialState)}>
      {children}
    </Context.Provider>
  );
};

//pull information from the data layer
export const useContextValue = () => useContext(Context);
