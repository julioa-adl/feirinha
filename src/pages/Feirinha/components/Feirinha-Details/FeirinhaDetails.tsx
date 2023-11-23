import { useParams } from 'react-router-dom';
import Navigator from '../../../../general-components/Navigator';
import User from '../../../../general-components/User';
import MobileMenu from '../../../../general-components/MobileMenu';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { format, parseISO, set } from 'date-fns';
import { IlistCart } from '../../../../interfaces/IFeirinha';
import SkeletonCard from '../../../../general-components/SkeletonCard';
import NotFindListCart from './components/NotFindListCart';
import ItemCard from './components/ItemCard';
import CallItemCart from './components/CallItemCart';
import { useQuery } from 'react-query';
import { fetchFeirinhas } from '../../../../helpers/httpClient/feirinhaClient';
import { fetchMarkets } from '../../../../helpers/httpClient/marketsClient';
import { useContext } from 'react';
import context from '../../../../context/myContext';
import AddItem from './components/AddItem';

const FeirinhaDetails = () => {
  const { id } = useParams();

  const {
    showItem,
  } = useContext(context)

  const { data: feirinhaData, isLoading: feirinhaLoading} = useQuery('feirinhas', () => fetchFeirinhas());
  const { data: marketaData, isLoading: marketLoading} = useQuery('markets', () => fetchMarkets());

  const feirinha = feirinhaData ? feirinhaData.find((f) => f._id === id) : false;
  const mercado = marketaData ? marketaData.find((mrkt) => mrkt['_id'] === (feirinha ? feirinha.marketId : '')) : false;

  const gasto = feirinha && feirinha.listCart.reduce((acc, cur) => {
    if (cur.buyed) {
      const price = Number(cur.price);
      const quantity = Number(cur.quantity);
  
      if (!isNaN(price) && !isNaN(quantity)) {
        return acc + price * quantity;
      }
    }
    return acc;
  }, 0);
  const restante = feirinha && (Number(feirinha.availableToSpend) - Number(gasto));

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

      <div className='flex justify-between items-start w-screen md:w-1/2 m-auto px-5 py-2 text-gray-900 dark:text-gray-100 text-xs'>
        <div className='flex flex-col items-center w-1/3 gap-1 bg-blue-400 dark:bg-blue-600 p-1 rounded-ss-md'>
          <h2>planejado</h2>
          <p className='font-ligth'>R$ {feirinha && feirinha.availableToSpend.toFixed(2)}</p>
        </div>

        <div className='flex flex-col items-center w-1/3 gap-1 bg-green-400 dark:bg-green-600 p-1'>
          <h2>gasto</h2>
          <p className='font-ligth'>R$ {feirinha && gasto.toFixed(2)}</p>
        </div>

        <div className='flex flex-col items-center w-1/3 gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-se-md'>
          <h2>restante</h2>
          <p className='font-ligth'>R$ {feirinha && restante.toFixed(2)}</p>
        </div>
      </div>
      <ul className='w-screem h-4/6 lg:h-4/5 px-5 overflow-y-auto flex flex-col items-center gap-1 drop-shadow-lg'>
        { !(feirinhaLoading && marketLoading) ? (
            feirinha.listCart && feirinha.listCart.length > 0 ? feirinha.listCart.map((items:IlistCart, i) => (
              <ItemCard key={ `item-cart-list-${items._id}-${i}`} listCart={items}/>
            )) : <NotFindListCart />
          ) : <SkeletonCard type={'feirinha'}/>
        }
      </ul>
      {
        showItem  && (
          showItem === 'register' && (
            <AddItem feirinhaId={id}/>
          )
        )
      }
      <CallItemCart />
      <MobileMenu />
    </div>
  )
};

export default FeirinhaDetails;
