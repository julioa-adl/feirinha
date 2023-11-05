import { useContext } from 'react';
import context from '../../context/myContext';
import Navigator from "../../general-components/Navigator";
import NotFind from '../../general-components/alerts/NotFind';
import ProductCard from './components/ProductCard';
import CallProdButton from './components/CallProdButton';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import SkeletonCard from '../../general-components/SkeletonCard';
import { Iprod } from '../../helpers/httpClient';
import Search from '../../general-components/Search';
import User from '../../general-components/User';

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
      <div className='flex items-center w-full justify-center'>
        <Navigator />
        <Search searching={'produto'}/>
        <User />
      </div>
      <ul className='w-screem h-4/5 px-5 overflow-auto flex flex-col my-8 pb-10 items-center gap-5 drop-shadow-lg'>
        { products ? (
            filterProd.length > 0 ? filterProd.map((prod:Iprod) => (
              <ProductCard key={ `product-item-list-${prod._id}` } prod={prod} />
            )) : <NotFind />
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
    </div>
  )
}

export default Products;
