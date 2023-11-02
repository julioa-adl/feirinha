import React, { ChangeEvent, useMemo, useState, useEffect, useCallback } from 'react';
import MyContext from './myContext';
import decode from '../helpers/jwtDecode';
import { fetchMarkets, fetchProducts } from "../helpers/httpClient";
import { Iprod } from '../helpers/httpClient';

interface AuxProps  { 
  children: React.ReactNode
}

type Isearch = {
  produto: string,
  mercado: string,
  feirinha: string
}

function Provider({ children }:AuxProps) {
  const [tokenDecode, setTokenDecode] = useState<object>();
  const [token, setToken] = useState();
  const [products, setProducts] = useState();
  const [markets, setMarkets] = useState();
  const [showProd, setShowProd] = useState<boolean | string | undefined>(false);
  const [showMarket, setShowMarket] = useState<boolean | string | undefined>(false);
  const [editProd, setEditProd] = useState<Iprod | undefined>();
  const [editMrkt, setEditMrkt] = useState<Iprod | undefined>();
  const [search, setSearch] = useState<Isearch>({
    produto: '',
    mercado: '',
    feirinha: ''
  })
  
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchMarkets();
        setMarkets(res);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchData();
  }, [showMarket]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setSearch((prevstate) => ({
      ...prevstate,
      [id]: value,
    }));
  }, [])

  const contextValue = useMemo(() => ({
    tokenDecode,
    products, setProducts, showProd, setShowProd, setEditProd, editProd, //produts context
    token,
    setToken,
    handleChange,
    search,
    markets, showMarket, setShowMarket, editMrkt, setEditMrkt //market context
  }), [tokenDecode, products, showProd, editProd, token, search, handleChange, markets, setShowMarket, showMarket, editMrkt, setEditMrkt]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;
