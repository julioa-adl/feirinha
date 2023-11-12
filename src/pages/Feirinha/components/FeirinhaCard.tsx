import { useContext } from "react";
import context from '../../../context/myContext';
import { ShoppingCartIcon, PencilSquareIcon, PauseIcon, /*PlayIcon, CheckIcon*/ } from '@heroicons/react/24/solid';
import { Ifeirinha } from "../../../interfaces/IFeirinha";
import { format, parseISO, set } from 'date-fns';

interface feirinhaCards {
  feirinha: Ifeirinha
}

const FeirinhaCard = ({ feirinha }:feirinhaCards) => {
  const {
    setEditFeirinha,
    setShowFeirinha,
    markets
  } = useContext(context);

  const formatarData = (dataISO) => {
    const dataUTC = set(parseISO(dataISO), { hours: 24, minutes: 0, seconds: 0 });
    const dataFormatada = format(dataUTC, "dd 'de' MMMM 'de' yyyy");
    return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  };
  

  const mercado = markets && markets.data.find((mrkt) => mrkt['_id'] === feirinha.marketId);
  
  return(
    <li
      className='flex justify-between items-center gap-2
      text-left w-full md:w-1/2 text-gray-900 dark:text-gray-100
      rounded-xl p-2 md:p-4 bg-gray-50 dark:bg-gray-800'
    >
      <ShoppingCartIcon className="h-6 text-yellow-500"/>
      <div className="w-4/6">
        <div className="flex flex-row gap-2 font-regular text-xs md:text-base lowercase items-center">
          <span className="w-full text-center">{ `${formatarData(feirinha.date)}` }</span>
        </div>
        <div className="dark:text-gray-500 font-light text-xs md:text-sm">
          <h2 className="w-full text-center">{ mercado.name } - { mercado.neighborhood } - { mercado.state }</h2>
        </div>
      </div>
      <div className='w-1/6 flex justify-end'>
        <PauseIcon className="w-8 h-8 text-yellow-500"/>
        <PencilSquareIcon
          onClick={() => {
            setEditFeirinha(feirinha)
            setShowFeirinha('update')
          }}
          className='w-8 h-8 cursor-pointer duration-300 ease-in-out hover:text-yellow-500' />
      </div>
    </li>
  )
};

export default FeirinhaCard;
