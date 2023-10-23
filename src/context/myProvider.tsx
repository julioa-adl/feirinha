import { useMemo, useState, useEffect } from 'react';
import MyContext from './myContext';
import decode from '../helpers/jwtDecode';

function Provider({ children }) {
  const [tokenDecode, setTokenDecode] = useState<object>();
  const [products, setProducts] = useState();
  const[showAdd, setShowAdd] = useState<boolean>();

  
  useEffect(() => {
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
    products,
    setProducts,
    showAdd,
    setShowAdd,
  }), [tokenDecode, products, showAdd]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;
