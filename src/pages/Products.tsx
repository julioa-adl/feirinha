import { useEffect, useState, useContext } from 'react';
import context from '../context/myContext';
import Navigator from "../components/Navigator";
import cart from '../assets/cart.gif'

const Products = () => {
  const {
    products,
  } = useContext(context);

  return(
    <div className='bg-white h-screen dark:bg-gray-900'>
      <Navigator />
      <ul className='w-screem flex flex-col m-8 items-center'>
        { products ? (
            products.map((prod) => (
              <li
                key={ prod._id }
                className='text-left w-1/2 text-gray-900 dark:text-gray-100'
              >{ prod.name }</li>
            ))
          ) : <li className='text-gray-900 dark:text-gray-100'>Carregando produtos ...</li>
        }
      </ul>
    </div>
  )
}

export default Products;
