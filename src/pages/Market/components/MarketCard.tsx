import { useContext } from "react";
import context from '../../../context/myContext';
import { PencilSquareIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import { Imarket } from "../../../interfaces/IMarket";

interface marketCards {
  mrkt: Imarket
}

const MarketCard = ({ mrkt }:marketCards) => {
  const {
    setEditMrkt,
    setShowMarket
  } = useContext(context);
  
  return(
    <li
      className='flex justify-between items-center gap-2
      text-left w-full md:w-1/2 text-gray-900 dark:text-gray-100
      rounded-xl p-2 md:p-4 bg-gray-100 dark:bg-gray-800'
    >
      <div className={`w-1/6 flex justify-center items-center h-14 md:h-20 md:px-4 bg-white dark:bg-gray-600 rounded-md`}>
        <BuildingStorefrontIcon className="h-8 md:h-12 text-red-600 dark:text-red-400 opacity-60"/>
      </div>
      <div className="w-4/6">
        <div className="flex flex-row gap-2 font-semibold text-xs md:text-base lowercase items-center">
          <span>{ `${mrkt.name} - ${mrkt.neighborhood}` }</span>
        </div>
        <div className="dark:text-gray-500 font-light text-xs uppercase">
          <h2><span className="font-bold">Endereço:</span>{ ` ${mrkt.address}` }</h2>
          <h2>{ `${mrkt.neighborhood} - ${mrkt.city}/${mrkt.state}` }</h2>
        </div>
      </div>
      <div className='w-1/6 flex justify-end'>
        <PencilSquareIcon
          onClick={() => {
            setEditMrkt(mrkt)
            setShowMarket('update')
          }}
          className='w-8 h-8 cursor-pointer duration-300 ease-in-out hover:text-red-500' />
      </div>
    </li>
  )
};

export default MarketCard;
