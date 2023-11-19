import axios from 'axios';
import decode from '../jwtDecode';

import { IlistCart } from '../../interfaces/IFeirinha';

const backendUrl = (endpoint: string) => `https://feirinha-beckend.vercel.app/${endpoint}`;

const registerItem = async (feirinhaId: string, newItem: IlistCart) => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);
  const userId = decode(token).data['_id'];

  const res = await axios({
    method: "post",
    url: backendUrl(`cart/${userId}`),
    data: {feirinhaId, newItem},
    headers: {
      Authorization: token || ''
    },
  });
  return res;
};

const updateItem = async (feirinhaId: string, itemId: string, updatedItem: IlistCart) => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);
  const userId = decode(token).data['_id'];

  const res = await axios({
    method: "put",
    url: backendUrl(`cart/${userId}`),
    data: { feirinhaId, itemId, updatedItem },
    headers: {
      Authorization: token || ''
    },
  });
  return res;
};

const deleteItem = async (feirinhaId: string, itemId: string) => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);
  const userId = decode(token).data['_id'];

  const res = await axios({
    method: "delete",
    url: backendUrl(`cart/${userId}`),
    data: { feirinhaId, itemId },
    headers: {
      Authorization: token || ''
    },
  });
  return res;
}

export {
  registerItem,
  updateItem,
  deleteItem,
}
