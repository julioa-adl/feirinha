import React, { useMemo, useState, useEffect } from 'react';
import MyContext from './myContext';
import decode from '../helpers/jwtDecode';
import { fetchProducts } from "../helpers/httpClient";
import { Iprod } from '../helpers/httpClient';

interface AuxProps  { 
  children: React.ReactNode
}

function Provider({ children }:AuxProps) {
  const [tokenDecode, setTokenDecode] = useState<object>();
  const [token, setToken] = useState();
  const [products, setProducts] = useState();
  const [showProd, setShowProd] = useState<boolean | string | undefined>(false);
  const [editProd, setEditProd] = useState<Iprod | undefined>();
  
  useEffect(() => {
    let res;
    const localToken = localStorage.getItem('userTokenFeirinha');
    if (token || localToken) {
      const thisToken = token || localToken !== null && JSON.parse(localToken);
      res = decode(thisToken);
    }
    setTokenDecode(res)
  }, [token])

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
  }, [showProd]);

  const contextValue = useMemo(() => ({
    tokenDecode,
    products,
    setProducts,
    showProd,
    setShowProd,
    setEditProd,
    editProd,
    token,
    setToken
  }), [tokenDecode, products, showProd, editProd, token]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;
