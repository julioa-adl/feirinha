import axios from 'axios';
import { Iuser } from "../../interfaces/IUser";
import decode from '../jwtDecode';

const backendUrl = (endpoint: string) => `feirinha-beckend-production.up.railway.app/${endpoint}`;

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

const validateEmail = async (email: string) => {
  try {
    const res = await axios.post(
      backendUrl('verificationCode'),
      { email }
    );
    console.log(res.data.message);
    return res;
  } catch (err: any) {
    throw err.response?.data?.message; // Lança o erro novamente para que possa ser tratado em outro lugar, se necessário
  }
};


const registUser = async ({ name, email, password, verificationCode, role = 'User' }: Iuser) => {
  try {
    const res = await axios.post(
      backendUrl('user'),
      {
        name, email, password, verificationCode, role,
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

const myUser = () => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken);
  const userName = decode(token).data['name'];

  return userName
}

export {
  loginUser,
  registUser,
  revalidateToken,
  validateEmail,
  myUser
}