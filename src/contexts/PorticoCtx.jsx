import React, { createContext, useContext, useState } from 'react';

export const PorticoCtx = createContext({
  _2ndScoll: false,
  handle2ndScroll: () => {},
});

export const usePortico = () => useContext(PorticoCtx);

export const ContextProvider = ({ children }) => {
  const [_2ndScoll, set_2ndScroll] = useState(false);

  const handle2ndScroll = (handler) => {
    set_2ndScroll(handler);
  };

  return <PorticoCtx.Provider value={{ _2ndScoll, handle2ndScroll }}>{children}</PorticoCtx.Provider>;
};
