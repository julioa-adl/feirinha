import axios from 'axios';
import decode from './jwtDecode';

import { Ifeirinha } from '../interfaces/IFeirinha';
import { Iprod } from '../interfaces/IProduct';
import { Imarket } from '../interfaces/IMarket';
import { Iuser } from '../interfaces/IUser';

const backendUrl = (endpoint: string) => `https://feirinha-beckend.vercel.app/${endpoint}`;

const loginUser = async ({ email, password }: Iuser) => {

  try {
    const res = await axios({
      method: "post",
      url: backendUrl('login'),
      data: {
        email,
        password
      },
    });
    const { token } = res.data;

    axios.defaults.headers.post.authorization = token;
    localStorage.setItem('userTokenFeirinha', JSON.stringify(token));
    return res;
  } catch (err) {
    return err;
  }
};

const registUser = async ({ name, email, password, birthday, role = 'User' }: Iuser) => {
  try {
    const res = await axios.post(
      backendUrl('user'),
      {
        name, email, password, birthday, role,
      },
    );
    const { token } = res.data;

    axios.defaults.headers.post.authorization = token;
    localStorage.setItem('userTokenFeirinha', JSON.stringify(token));
    return res;
  } catch (err) {
    return err;
  }
};

const revalidateToken = async (): Promise<boolean> => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken)
  try {
    const res = await axios({
      method: "post",
      url: backendUrl('revalidate'),
      data: {},
      headers: {
        Authorization: token
      },
    });
    if (res.data.message === 'Valid Token!') {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

const fetchProducts = async () => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken)
  try {
    const res = await axios({
      method: "get",
      url: backendUrl('product'),
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

const registerProduct = async ({ name, subName, manufacturer, category, code, unitMeasure, size, image }: Iprod) => {
  let urlImgBB;
  if (image) {
    urlImgBB = await postImgbb(image) || '';
  }
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);

  const dataImg = { name, subName, manufacturer, category, code, unitMeasure, size, image: urlImgBB };
  const dataWithoutImg = { name, subName, manufacturer, category, code, unitMeasure, size }

  const res = await axios({
    method: "post",
    url: backendUrl('product'),
    data: image && urlImgBB ? dataImg : dataWithoutImg,
    headers: {
      Authorization: token || ''
    },
  });
  return res;
};

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

const registerFeirinha = async ({ marketId }: Ifeirinha) => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);
  const userId = decode(token).data['_id'];
  
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const res = await axios({
    method: "post",
    url: backendUrl(`feirinha/${userId}`),
    data: {userId, marketId, date: today.toLocaleDateString()},
    headers: {
      Authorization: token || ''
    },
  });
  return res;
};

const updateProduct = async ({ id, name, subName, manufacturer, category, code, unitMeasure, size, image }: Iprod) => {
  let urlImgBB;
  if (image) {
    urlImgBB = await postImgbb(image) || '';
  }
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);

  const dataImg = { id, name, subName, manufacturer, category, code, unitMeasure, size, image: urlImgBB };
  const dataWithoutImg = { id, name, subName, manufacturer, category, code, unitMeasure, size }
  
  const res = await axios({
    method: "put",
    url: backendUrl('product'),
    data: image && urlImgBB ? dataImg : dataWithoutImg,
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

const postImgbb = async (file) => {
  const apiKey = 'a022e0c88f5aa8bad8ab2074ef2fd9c3';

  const formData = new FormData();
  formData.set('key', apiKey)
  formData.append('image', file.split(",").pop())

  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: formData
    })

    return response.data.data.url;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export {
  loginUser,
  registUser,
  revalidateToken,
  fetchProducts,
  registerProduct,
  updateProduct,
  fetchMarkets,
  registerMarket,
  updateMarket,
  fetchFeirinhas,
  registerFeirinha,
  updateFeirinha,
}
