import { useContext, useState } from 'react';
import context from '../../context/myContext';
import Navigator from "../../general-components/Navigator";
import NotFind from '../../general-components/alerts/NotFind';
import ProductCard from './components/ProductCard';
import CallProdButton from './components/CallProdButton';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import SkeletonCard from '../../general-components/SkeletonCard';
import { Iprod } from '../../interfaces/IProduct';
import Search from '../../general-components/Search';
import User from '../../general-components/User';
import MobileMenu from '../../general-components/MobileMenu';
import { useQuery } from 'react-query';
import { fetchProducts } from '../../helpers/httpClient/productClient';

const Products = () => {
  const {
    showProd,
  } = useContext(context);
  
  const { data, isLoading } = useQuery('products', () => fetchProducts(), {retry: 10});
  
  const productsSort = data && data.sort((a,b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  });
  const [mySearch, setMySearch] = useState(productsSort)

  return(
    <div className='bg-white h-screen dark:bg-gray-900'>
      <div className='fixed top-0 z-30 md:relative bg-white dark:bg-gray-900 p-5 flex items-center w-full justify-center'>
        <Navigator />
        <Search arrayToSearch={productsSort} typeUse='produtos' setResultSearchState={setMySearch}/>
        <User />
      </div>
      <ul className='w-screem pt-20 pb-36 md:py-0 lg:h-4/5 px-5 overflow-auto flex flex-col items-center gap-2 drop-shadow-lg'>
        { !isLoading && data ? (
            !mySearch ? (productsSort.map((prod:Iprod) => (
              <ProductCard key={ `product-item-list-${prod._id}` } prod={prod} />
            ))) : mySearch.length > 0 ? (mySearch.map((prod:Iprod) => (
              <ProductCard key={ `product-item-list-${prod._id}` } prod={prod} />
            ))) : <NotFind />
          ) : <SkeletonCard type={'produto'}/>
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
      <MobileMenu />
    </div>
  )
}

export default Products;
