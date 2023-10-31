import { useContext } from 'react';
import context from '../../context/myContext';
import Navigator from "../../general-components/Navigator";
import ProductCard from './components/ProductCard';
import AddProdButton from './components/CallProdButton';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import { Iprod } from '../../helpers/httpClient';

const Products = () => {
  const {
    products,
    showProd,
    search
  } = useContext(context);

  return(
    <div className='bg-white h-screen dark:bg-gray-900 overflow-hidden'>
      <Navigator searching='produto'/>
      <ul className='w-screem h-4/5 px-5 overflow-auto flex flex-col my-8 pb-10 items-center gap-5 drop-shadow-lg'>
        { products ? (
            products.filter(prod => ((`${prod.name} ${prod.subName} ${prod.size}${prod.unitMeasure}`).toLowerCase().includes(search.produto.toLowerCase() || '')))
            .map((prod:Iprod) => (
              <ProductCard key={ `product-item-list-${prod._id}` } prod={prod} />
            ))
          ) : <li className='text-gray-900 dark:text-gray-100'>Carregando produtos ...</li>
        }
      </ul>
      {
        showProd  && (
          showProd === 'register' ? (
            <AddProduct />
          ) : (
            <EditProduct />
          )
        )
      }
      <AddProdButton />
    </div>
  )
}

export default Products;
