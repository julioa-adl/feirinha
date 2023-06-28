/* eslint-disable max-len */

const prodInput = {
  name: 'Macarrão',
  subName: 'Spaguete',
  manufacturer: 'Vitalera',
  category: 'Massas',
  code: '0100010101',
  unitMeasure: 'g',
  size: 200,
  image: './src/images/0100010101',
}

const prodOutPut = {
  id: 'a1b2c3d4e5f6g7h8i9',
  name: 'Macarrão',
  subName: 'Spaguete',
  manufacturer: 'Vitalera',
  category: 'Massas',
  code: '0100010101',
  unitMeasure: 'g',
  size: 200,
  image: './src/images/0100010101',
};

const getAllProducts = [
  {
    id: 'a1b2c3d4e5f6g7h8i9',
    name: 'Macarrão',
    subName: 'Spaguete',
    manufacturer: 'Vitalera',
    category: 'Massas',
    code: '0100010101',
    unitMeasure: 'g',
    size: 200,
    image: './src/images/0100010101',
  },
  {
    id: 'aaaaaaaaaaaaaaaaaa',
    name: 'Feijão',
    subName: 'Mulatinho',
    manufacturer: 'Tio João',
    category: 'Grãos',
    code: '02002022022',
    unitMeasure: 'kg',
    size: 1,
    image: './src/images/020222022002',
  }
]

export {
  prodInput,
  prodOutPut,
  getAllProducts,
}