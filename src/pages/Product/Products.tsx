import { useContext } from 'react';
import context from '../../context/myContext';
import Navigator from "../../general-components/Navigator";
import NotFind from '../../general-components/alerts/NotFind';
import ProductCard from './components/ProductCard';
import CallProdButton from './components/CallProdButton';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import { Iprod } from '../../helpers/httpClient';

const Products = () => {
  const {
    products,
    showProd,
    search
  } = useContext(context);

  const productsSort = products && products.sort((a,b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
});
  const filterProd = products && productsSort.filter(prodF => ((`${prodF.name} ${prodF.subName} ${prodF.size}${prodF.unitMeasure}`).toLowerCase().includes(search.produto.toLowerCase() || '')))

  return(
    <div className='bg-white h-screen dark:bg-gray-900 overflow-hidden'>
      <Navigator searching='produto'/>
      <ul className='w-screem h-4/5 px-5 overflow-auto flex flex-col my-8 pb-10 items-center gap-5 drop-shadow-lg'>
        { products ? (
            filterProd.length > 0 ? filterProd.map((prod:Iprod) => (
              <ProductCard key={ `product-item-list-${prod._id}` } prod={prod} />
            )) : <NotFind />
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
      <CallProdButton />
    </div>
  )
}

export default Products;
