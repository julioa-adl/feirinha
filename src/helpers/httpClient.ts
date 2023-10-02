import axios from 'axios';

const backendUrl = (endpoint: string) => `https://feirinha-beckend-317l2alk2-julioa-adl.vercel.app/${endpoint}`;

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
    const saveToken = {
      token,
    };
    axios.defaults.headers.post.authorization = token;
    localStorage.setItem('user', JSON.stringify(saveToken));
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
    const saveToken = {
      token,
    };
    axios.defaults.headers.post.authorization = token;
    localStorage.setItem('user', JSON.stringify(saveToken));
    return res;
  } catch (err) {
    return err;
  }
};

export {
  loginUser,
  registUser,
}
