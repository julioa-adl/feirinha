import { useMemo, useState } from 'react';
import MyContext from './myContext';
import decode from '../helpers/jwtDecode';

function Provider({ children }) {
  const [tokenDecode, setTokenDecode] = useState()

  useState(() => {
    let res;
    const localToken = localStorage.getItem('userTokenFeirinha');
    if (localToken !== null) {
      const token = JSON.parse(localToken);
      res = decode(token);
    }
    setTokenDecode(res)
  }, [])

  const contextValue = useMemo(() => ({
    tokenDecode,
  }), [tokenDecode]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;
