import React, { ChangeEvent, useMemo, useState, useEffect, useCallback } from 'react';
import MyContext from './myContext';
import decode from '../helpers/jwtDecode';
import { fetchFeirinhas } from "../helpers/httpClient/feirinhaClient";
import { fetchProducts } from '../helpers/httpClient/productClient';
import { fetchMarkets } from '../helpers/httpClient/marketsClient';
import { Iprod } from '../interfaces/IProduct';
import { useQuery } from 'react-query';

interface AuxProps  { 
  children: React.ReactNode
}

type Isearch = {
  produto: string,
  mercado: string,
  feirinha: string,
  item: string
}

function Provider({ children }:AuxProps) {
  const [tokenDecode, setTokenDecode] = useState<object>();
  const [token, setToken] = useState();
  const [code, setCode] = useState();

  const [showProd, setShowProd] = useState<boolean | string | undefined>(false);
  const [showMarket, setShowMarket] = useState<boolean | string | undefined>(false);
  const [showFeirinha, setShowFeirinha] = useState<boolean | string | undefined>(false);
  const [showItem, setShowItem] = useState<boolean | string | undefined>(false);

  const [editProd, setEditProd] = useState<Iprod | undefined>();
  const [editMrkt, setEditMrkt] = useState<Iprod | undefined>();
  const [editFeirinha, setEditFeirinha] = useState<Iprod | undefined>();
  const [editItem, setEditItem] = useState<Iprod | undefined>();

  const [search, setSearch] = useState<Isearch>({
    produto: '',
    mercado: '',
    feirinha: '',
    item: ''
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

  const products = useQuery('products', () => fetchProducts(), {retry: 10});
  const markets = useQuery('markets', () => fetchMarkets(), {retry: 10});
  const feirinhas = useQuery('feirinhas', () => fetchFeirinhas(), {retry: 10});


  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setSearch((prevstate) => ({
      ...prevstate,
      [id]: value,
    }));
  }, [])

  const contextValue = useMemo(() => ({
    tokenDecode,
    products, showProd, setShowProd, setEditProd, editProd, //produts context
    token,
    setToken,
    handleSearch,
    search,
    markets, showMarket, setShowMarket, editMrkt, setEditMrkt, //market context
    feirinhas, showFeirinha, setShowFeirinha, editFeirinha, setEditFeirinha,
    showItem, setShowItem, editItem, setEditItem,
    code, setCode
  }), [tokenDecode,
      products, showProd, editProd,
      token, search, handleSearch,
      markets, setShowMarket, showMarket, editMrkt, setEditMrkt,
      feirinhas, showFeirinha, setShowFeirinha, editFeirinha, setEditFeirinha,
      showItem, setShowItem, editItem, setEditItem,
      code, setCode]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;
