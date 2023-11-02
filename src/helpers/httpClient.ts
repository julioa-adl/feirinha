import axios from 'axios';

const backendUrl = (endpoint: string) => `https://feirinha-beckend.vercel.app/${endpoint}`;

type Iuser = {
  name?: string,
  email?: string,
  password?: string,
  birthday?: string,
  role?: string
}
   
export type Iprod = {
  id?: string | undefined,
  _id?: string | undefined,
  name: string | undefined,
  subName: string | undefined,
  manufacturer: string | undefined,
  category: string | undefined,
  code: string | undefined,
  image: ArrayBuffer | string | undefined,
  unitMeasure?: string | undefined,
  size?: number,
}

export type Imarket = {
  id?: string | undefined,
  _id?: string | undefined,
  name: string | undefined,
  address: string | undefined,
  neighborhood: string | undefined,
  city: string | undefined,
  state: string | undefined,
}

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
    console.log(res.data.message)
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

const registerProduct = async ({ name, subName, manufacturer, category, code, unitMeasure, size, image }: Iprod) => {
  const urlImgBB = await postImgbb(image) || '';
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);
  try {
    const res = await axios({
      method: "post",
      url: backendUrl('product'),
      data: {name, subName, manufacturer, category, code, unitMeasure, size, image: urlImgBB},
      headers: {
        Authorization: token || ''
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

const registerMarket = async ({ name, address, neighborhood, city, state }: Imarket) => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);
  try {
    const res = await axios({
      method: "post",
      url: backendUrl('market'),
      data: {name, address, neighborhood, city, state},
      headers: {
        Authorization: token || ''
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

const updateProduct = async ({ id, name, subName, manufacturer, category, code, unitMeasure, size, image }: Iprod) => {
  let urlImgBB;
  if (image) {
    urlImgBB = await postImgbb(image);
  }
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken)
  try {
    const res = await axios({
      method: "put",
      url: backendUrl('product'),
      data: { id, name, subName, manufacturer, category, code, unitMeasure, size, image: urlImgBB || null },
      headers: {
        Authorization: token || ''
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

const updateMarket = async ({ id, name, address, neighborhood, city, state }: Imarket) => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken)
  try {
    const res = await axios({
      method: "put",
      url: backendUrl('market'),
      data: { id, name, address, neighborhood, city, state },
      headers: {
        Authorization: token || ''
      },
    });
    return res;
  } catch (err) {
    return err;
  }
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
}
