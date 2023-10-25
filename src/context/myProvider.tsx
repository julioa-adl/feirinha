import { useMemo, useState, useEffect } from 'react';
import MyContext from './myContext';
import decode from '../helpers/jwtDecode';
import { fetchProducts } from "../helpers/httpClient";
import { Iprod } from '../helpers/httpClient';

function Provider({ children }) {
  const [tokenDecode, setTokenDecode] = useState<object>();
  const [products, setProducts] = useState();
  const [showProd, setShowProd] = useState<boolean | string>(false);
  const [editProd, setEditProd] = useState<Iprod>();
  
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
    const fetchData = async () => {
      try {
        const res = await fetchProducts();
        setProducts(res);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchData();

    // if (!products) {
    //   fetchData();
    // }
  }, [products, setProducts, showProd]);

  const contextValue = useMemo(() => ({
    tokenDecode,
    products,
    setProducts,
    showProd,
    setShowProd,
    setEditProd,
    editProd
  }), [tokenDecode, products, showProd, editProd]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;
