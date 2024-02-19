import axios from 'axios';
// import { IRecommendation } from '../../interfaces/IRecommendation';
// import decode from '../jwtDecode';

const backendUrl = (endpoint: string) => `https://feirinha-beckend.vercel.app/${endpoint}`;

const getRecommendations = async (productId: string | undefined) => {
  const localToken = localStorage.getItem('userTokenFeirinha');
  if (localToken === null) return false;
  const token = JSON.parse(localToken)
  try {
    const res = await axios({
      method: "get",
      url: backendUrl(`recommendation/${productId}`),
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
    getRecommendations,
}