import axios from 'axios';
import decode from '../jwtDecode';

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

const postRecommendation = async ({ productId, rating, comment }) => {
    const localToken = localStorage.getItem('userTokenFeirinha');
    if (localToken === null) return false;
    const token = JSON.parse(localToken);
    const userId = decode(token).data['_id'];
    const userName = decode(token).data['name'];

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
  
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // adiciona 1 ao mês porque os meses são zero indexados
    const day = today.getDate().toString().padStart(2, '0');
    const year = today.getFullYear().toString().slice(-2);
  
    const formattedDate = `${month}-${day}-${year}`;

    const postThis = { userId, userName, productId, rating, comment, date: formattedDate }
    console.log(postThis)
  
    const res = await axios({
      method: "post",
      url: backendUrl('recommendation'),
      data: postThis,
      headers: {
        Authorization: token || ''
      },
    });
    return res;
  };

  const deleteRecomendation = async (recomendationId) => {
    const localToken = localStorage.getItem('userTokenFeirinha');
    if (localToken === null) return false;
    const token = JSON.parse(localToken);
    const userId = decode(token).data['_id'];
  
    const res = await axios({
      method: "delete",
      url: backendUrl(`recommendation/${userId}`),
      data: { id: recomendationId },
      headers: {
        Authorization: token || ''
      },
    });
    return res;
  }

  const thisIsMyComment = (commentUserId) => {
    const localToken = localStorage.getItem('userTokenFeirinha');
    if (localToken === null) return false;
    const token = JSON.parse(localToken);
    const userId = decode(token).data['_id'];

    if (commentUserId === userId) return true;
    return false
  }

export {
    getRecommendations,
    postRecommendation,
    deleteRecomendation,
    thisIsMyComment
}