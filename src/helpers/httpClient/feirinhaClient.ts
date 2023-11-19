import axios from 'axios';
import decode from '../jwtDecode';

import { Ifeirinha } from '../../interfaces/IFeirinha';

const backendUrl = (endpoint: string) => `https://feirinha-beckend.vercel.app/${endpoint}`;

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

const registerFeirinha = async ({ marketId, availableToSpend }: Ifeirinha) => {
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
  console.log(formattedDate)

  const res = await axios({
    method: "post",
    url: backendUrl(`feirinha/${userId}`),
    data: {userId, marketId, availableToSpend, listCart: [], date: formattedDate},
    headers: {
      Authorization: token || ''
    },
  });
  return res;
};

const updateFeirinha = async ({ id, userId, marketId, listCart, date }: Ifeirinha) => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);

  const res = await axios({
    method: "put",
    url: backendUrl(`feirinha/${userId}`),
    data: { id, userId, marketId, listCart, date },
    headers: {
      Authorization: token || ''
    },
  });
  return res;
};

export {
  fetchFeirinhas,
  registerFeirinha,
  updateFeirinha,
}
