import { useParams } from 'react-router-dom';
import Navigator from '../../../../general-components/Navigator';
import User from '../../../../general-components/User';
import MobileMenu from '../../../../general-components/MobileMenu';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import context from '../../../../context/myContext';
import { format, parseISO, set } from 'date-fns';
import { IlistCart } from '../../../../interfaces/IFeirinha';
import SkeletonCard from '../../../../general-components/SkeletonCard';
import NotFindListCart from './components/NotFindListCart';
import ItemCard from './components/ItemCard';
import CallItemCart from './components/CallItemCart';

const FeirinhaDetails = () => {
  const { id } = useParams();

  const {
    feirinhas,
    markets
  } = useContext(context);

  const { data: feirinhaData, isLoading: feirinhaLoading} = feirinhas;
  const { data: marketaData, isLoading: marketLoading} = markets;

  const feirinha = feirinhaData ? feirinhaData.find((f) => f._id === id) : false;
  const mercado = marketaData ? marketaData.find((mrkt) => mrkt['_id'] === (feirinha ? feirinha.marketId : '')) : false;

  const formatarData = (dataISO) => {
    const dataUTC = set(parseISO(dataISO), { hours: 24, minutes: 0, seconds: 0 });
    const dataFormatada = format(dataUTC, "dd'/'MM'/'yyyy");
    return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  };

  return (
    <div className="bg-white h-screen dark:bg-gray-900">
      <div className='p-5 flex items-center w-full justify-between'>
        <Navigator />
        {
          feirinhaLoading && marketLoading ? (
          <h1 className='rounded-full max-w-xs px-4 h-8 py-2 w-full bg-gray-100 dark:bg-gray-800
            relative overflow-hidden shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r
            before:from-transparent before:via-white/40 before:animate-[shimmer_1.5s_infinite]'/>
          ) : (
          <h1 className="rounded-full flex items-start justify-center gap-1 max-w-xs text-xs px-2 py-2 mr-2 md:m-0 w-full bg-gray-100 dark:bg-gray-800 md:font-bold text-gray-900 dark:text-white">
            <ShoppingCartIcon className="hidden md:block h-4" />
            {feirinha && mercado && `${formatarData(feirinha.date)} - ${mercado.name.slice(0, 10)} - ${mercado.neighborhood.slice(0, 5)}/${mercado.state}`}
          </h1>)
        }
        
        <User />
      </div>
      <ul className='w-screem h-4/6 lg:h-4/5 px-5 overflow-auto flex flex-col items-center gap-1 drop-shadow-lg'>
        { !(feirinhaLoading && marketLoading) ? (
            feirinha.listCart ? feirinha.listCart.map((items:IlistCart, i) => (
              <ItemCard key={ `item-cart-list-${i}`} listCart={items}/>
            )) : <NotFindListCart />
          ) : <SkeletonCard type={'feirinha'}/>
        }
      </ul>
      <CallItemCart />
      <MobileMenu />
    </div>
  )
};

export default FeirinhaDetails;
