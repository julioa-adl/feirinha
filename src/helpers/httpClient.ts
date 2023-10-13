import axios from 'axios';

const backendUrl = (endpoint: string) => `https://feirinha-beckend.vercel.app/${endpoint}`;

type Iuser = {
  name?: string,
  email?: string,
  password?: string,
  birthday?: string,
  role?: string
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

export {
  loginUser,
  registUser,
  revalidateToken,
  fetchProducts,
}
