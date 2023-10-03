import { useMemo, useEffect } from 'react';
import MyContext from './myContext';

function Provider({ children }) {
  const teste = false

  const contextValue = useMemo(() => ({
    teste,
  }), []);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;
