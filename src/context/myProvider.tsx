import React, { useMemo, useState, useEffect } from 'react';
import MyContext from './myContext';
import decode from '../helpers/jwtDecode';
import { fetchAllFeirinhas, fetchFeirinhas } from "../helpers/httpClient/feirinhaClient";
import { fetchProducts } from '../helpers/httpClient/productClient';
import { fetchMarkets } from '../helpers/httpClient/marketsClient';
import { Iprod } from '../interfaces/IProduct';
import { useQuery } from 'react-query';

interface AuxProps  { 
  children: React.ReactNode
}

function Provider({ children }:AuxProps) {
  const [tokenDecode, setTokenDecode] = useState<object>();
  const [token, setToken] = useState();

  const [codeScanner, setCodeScanner] = useState<string | undefined>();

  const [showProd, setShowProd] = useState<boolean | string | undefined>(false);
  const [showMarket, setShowMarket] = useState<boolean | string | undefined>(false);
  const [showFeirinha, setShowFeirinha] = useState<boolean | string | undefined>(false);
  const [showItem, setShowItem] = useState<boolean | string | undefined>(false);

  const [editProd, setEditProd] = useState<Iprod | undefined>();
  const [editMrkt, setEditMrkt] = useState<Iprod | undefined>();
  const [editFeirinha, setEditFeirinha] = useState<Iprod | undefined>();
  const [editItem, setEditItem] = useState<Iprod | undefined>();

  const [registerNewProdInAddItemToCart, setRegisterNewProdInAddItemToCart] = useState(false);

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
  const allFeirinhas = useQuery('allFeirinhas', () => fetchAllFeirinhas(), {retry: 10});

  const contextValue = useMemo(() => ({
    tokenDecode,
    products, showProd, setShowProd, setEditProd, editProd, //produts context
    token, codeScanner, setCodeScanner,
    setToken,
    registerNewProdInAddItemToCart, setRegisterNewProdInAddItemToCart,
    markets, showMarket, setShowMarket, editMrkt, setEditMrkt, //market context
    allFeirinhas, feirinhas, showFeirinha, setShowFeirinha, editFeirinha, setEditFeirinha,
    showItem, setShowItem, editItem, setEditItem,
  }), [tokenDecode,
      products, showProd, editProd, codeScanner, setCodeScanner,
      token,
      registerNewProdInAddItemToCart, setRegisterNewProdInAddItemToCart,
      markets, setShowMarket, showMarket, editMrkt, setEditMrkt,
      allFeirinhas, feirinhas, showFeirinha, setShowFeirinha, editFeirinha, setEditFeirinha,
      showItem, setShowItem, editItem, setEditItem,
      ]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;
