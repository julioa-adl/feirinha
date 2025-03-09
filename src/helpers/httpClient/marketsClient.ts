import axios from 'axios';
import { Imarket } from '../../interfaces/IMarket';

const backendUrl = (endpoint: string) => `https://feirinha-beckend-production.up.railway.app/${endpoint}`;

const fetchMarkets = async () => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken)
  try {
    const res = await axios({
      method: "get",
      url: backendUrl('market'),
      data: {},
      headers: {
        Authorization: token
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    return false;
  }
}

const getMarketById = async (id: string | undefined) => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken)
  try {
    const res = await axios({
      method: "get",
      url: backendUrl(`market/${id}`),
      data: {},
      headers: {
        Authorization: token
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    return false;
  }
}

const registerMarket = async ({ name, address, neighborhood, city, state }: Imarket) => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);

  const res = await axios({
    method: "post",
    url: backendUrl('market'),
    data: {name, address, neighborhood, city, state},
    headers: {
      Authorization: token || ''
    },
  });
  return res;
};

const updateMarket = async ({ id, name, address, neighborhood, city, state }: Imarket) => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);

  const res = await axios({
    method: "put",
    url: backendUrl('market'),
    data: { id, name, address, neighborhood, city, state },
    headers: {
      Authorization: token || ''
    },
  });
  return res;
};

export {
  fetchMarkets,
  getMarketById,
  registerMarket,
  updateMarket,
}
