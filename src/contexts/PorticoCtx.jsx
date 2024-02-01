import React, { createContext, useContext, useEffect, useState } from 'react';

export const PorticoCtx = createContext({
  _2ndScoll: false,
  handle2ndScroll: () => {},
});

export const usePortico = () => useContext(PorticoCtx);

export const ContextProvider = ({ children }) => {
  const [_2ndScoll, set_2ndScroll] = useState(false);

  const handle2ndScroll = () => {
    set_2ndScroll((previous) => !previous);
  };

  useEffect(() => {
    console.log(_2ndScoll ? 'in' : 'out');
  }, [_2ndScoll]);

  return <PorticoCtx.Provider value={{ _2ndScoll, handle2ndScroll }}>{children}</PorticoCtx.Provider>;
};
