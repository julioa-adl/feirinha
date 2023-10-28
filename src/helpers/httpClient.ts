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
  unitMeasure?: string | undefined,
  size?: number,
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

const registerProduct = async ({ name, subName, manufacturer, category, code, unitMeasure, size }: Iprod) => {
  try {
    const res = await axios.post(
      backendUrl('product'),
      {
        name, subName, manufacturer, category, code, unitMeasure, size
      },
    );
    return res;
  } catch (err) {
    return err;
  }
};

const updateProduct = async ({ id, name, subName, manufacturer, category, code, unitMeasure, size }: Iprod) => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken)
  try {
    const res = await axios({
      method: "put",
      url: backendUrl('product'),
      data: { id, name, subName, manufacturer, category, code, unitMeasure, size },
      headers: {
        Authorization: token
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export {
  loginUser,
  registUser,
  revalidateToken,
  fetchProducts,
  registerProduct,
  updateProduct,
}
