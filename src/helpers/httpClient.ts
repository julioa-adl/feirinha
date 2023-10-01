import axios from 'axios';

const backendUrl = (endpoint: string) => `https://feirinha-beckend-317l2alk2-julioa-adl.vercel.app/${endpoint}`;

type login = {
  email?: string,
  password?: string,
}

const loginUser = async ({ email, password }: login) => {

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

// const registUser = async ({ name, email, password, role = 'customer' }) => {
//   let error = false;
//   try {
//     const res = await httpClient.post(
//       backendUrl('register'),
//       {
//         name, email, password, role,
//       },
//     );
//     const saveUser = {
//       name,
//       email,
//       role,
//       token: res.data.token,
//     };
//     httpClient.defaults.headers.post.authorization = saveUser.token;
//     localStorage.setItem('user', JSON.stringify(saveUser));
//   } catch (err) {
//     error = true;
//   }
//   return { error };
// };

export {
  loginUser,
  // registUser,
}
