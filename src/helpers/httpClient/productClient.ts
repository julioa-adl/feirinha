import axios from 'axios';
import { Iprod } from '../../interfaces/IProduct';

const backendUrl = (endpoint: string) => `https://feirinha-beckend.vercel.app/${endpoint}`;

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

const registerProduct = async ({ name, subName, manufacturer, category, code, unitMeasure, size, image }: Iprod) => {
  try {
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
    const data = res.data.message
    return data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error; // rejeitar a promise para que o estado de erro seja acionado na mutação
  }
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
  fetchProducts,
  registerProduct,
  updateProduct
}