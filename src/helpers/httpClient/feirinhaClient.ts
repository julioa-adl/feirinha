import axios from 'axios';
import decode from '../jwtDecode';

import { Ifeirinha } from '../../interfaces/IFeirinha';

const backendUrl = (endpoint: string) => `feirinha-beckend-production.up.railway.app/${endpoint}`;

const fetchAllFeirinhas = async () => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);

  try {
    const res = await axios({
      method: "get",
      url: backendUrl(`feirinha`),
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

const fetchFeirinhas = async () => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);
  const userId = decode(token).data['_id'];

  try {
    const res = await axios({
      method: "get",
      url: backendUrl(`feirinha/${userId}`),
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

const getAllByProductId = async (productId: string | undefined) => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);

  try {
    const res = await axios({
      method: "get",
      url: backendUrl(`feirinha/statistic/${productId}`),
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

const registerFeirinha = async ({ title, marketId, availableToSpend }: Ifeirinha) => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);
  const userId = decode(token).data['_id'];
  
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // adiciona 1 ao mês porque os meses são zero indexados
  const day = today.getDate().toString().padStart(2, '0');
  const year = today.getFullYear().toString().slice(-2);

  const formattedDate = `${month}-${day}-${year}`;

  const res = await axios({
    method: "post",
    url: backendUrl(`feirinha/${userId}`),
    data: {title, userId, marketId, availableToSpend, listCart: [], date: formattedDate},
    headers: {
      Authorization: token || ''
    },
  });
  return res;
};

const updateFeirinha = async ({ id, title, userId, marketId, listCart, date, availableToSpend }: Ifeirinha) => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);

  const res = await axios({
    method: "put",
    url: backendUrl(`feirinha/${userId}`),
    data: { id, title, userId, marketId, listCart, date, availableToSpend },
    headers: {
      Authorization: token || ''
    },
  });
  return res;
};

const deleteFeirinha = async (feirinhaId) => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);
  const userId = decode(token).data['_id'];

  const res = await axios({
    method: "delete",
    url: backendUrl(`feirinha/${userId}`),
    data: { id: feirinhaId },
    headers: {
      Authorization: token || ''
    },
  });
  return res;
}

export {
  fetchAllFeirinhas,
  fetchFeirinhas,
  registerFeirinha,
  updateFeirinha,
  deleteFeirinha,
  getAllByProductId
}
