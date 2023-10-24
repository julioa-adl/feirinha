import { useEffect, useContext } from 'react';
import context from '../context/myContext';
import Navigator from "../components/Navigator";
import ProductCard from '../components/ProductCard';
import AddProdButton from '../components/AddProdButton';
import AddProduct from './AddProduct';

const Products = () => {
  const {
    products,
    showAdd
  } = useContext(context);

  return(
    <div className='bg-white h-screen dark:bg-gray-900'>
      <Navigator />
      <ul className='w-screem flex flex-col m-8 items-center gap-5'>
        { products ? (
            products.map((prod) => (
              <ProductCard key={ `product-item-list-${prod._id}` } prod={prod} />
            ))
          ) : <li className='text-gray-900 dark:text-gray-100'>Carregando produtos ...</li>
        }
      </ul>
      {
        showAdd && <AddProduct />
      }
      <AddProdButton />
    </div>
  )
}

export default Products;
