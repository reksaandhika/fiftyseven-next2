import React, { useCallback, useMemo, useState } from 'react';

/**
 * @template [T=keyof Omit<AppContextValue, 'set'>]
 * @callback AppContextValueSetter
 * @param {T} key
 * @param {AppContextValue[T]} value
 * @returns {void}
 */

/**
 * @typedef {object} AppContextValue
 * @property {boolean} [footerVisible]
 * @property {boolean} [navButtonVisible]
 * @property {AppContextValueSetter} set
 */

/** @type {AppContextValue} */
const defaultContextValue = {
  footerVisible: true,
  navButtonVisible: true,
  set: () => { }
};

/** @type {import('react').Context<AppContextValue>} */
const AppContext = React.createContext();

export const AppContextProvider = AppContext.Provider;

export const useAppContext = () => {
  const contextValue = React.useContext(AppContext);

  return contextValue || defaultContextValue;
};

/** @type {import('react').FC} */
export const AppProvider = ({ children }) => {
  const [state, setState] = useState(defaultContextValue);

  const set = useCallback(
    /** @type {AppContextValueSetter} */
    (key, value) => {
      setState((state) => ({
        ...state,
        [key]: value
      }));
    },
    []
  );

  const contextValue = useMemo(() => ({
    ...state,
    set
  }), [state, set]);

  return (
    <AppContextProvider value={contextValue}>
      {children}
    </AppContextProvider>
  );
};

AppProvider.displayName = 'AppProvider';
