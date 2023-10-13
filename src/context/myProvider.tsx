import { useMemo, useCallback, useState, useEffect } from 'react';
import MyContext from './myContext';
import decode from '../helpers/jwtDecode';
import { fetchProducts } from "../helpers/httpClient";

function Provider({ children }) {
  const [tokenDecode, setTokenDecode] = useState();
  const [products, setProducts] = useState();
  
  useEffect(() => {
    let res;
    const localToken = localStorage.getItem('userTokenFeirinha');
    if (localToken !== null) {
      const token = JSON.parse(localToken);
      res = decode(token);
    }
    setTokenDecode(res)
  }, [])


  useEffect(() => {
    
    const prods = async () => {
      const res = await fetchProducts()
      setProducts(res)
    }
    prods()
  }, []);

  const contextValue = useMemo(() => ({
    tokenDecode,
    products,
    setProducts,
  }), [tokenDecode, products]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;
