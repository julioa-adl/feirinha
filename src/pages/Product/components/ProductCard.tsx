import { useContext } from "react";
import context from '../../../context/myContext';
import { PencilSquareIcon, ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';
import { Iprod } from "../../../helpers/httpClient";

interface productCards {
  prod: Iprod
}

const ProductCard = ({ prod }:productCards) => {
  const {
    setEditProd,
    setShowProd
  } = useContext(context);
  
  return(
    <li
      className='flex justify-between items-center gap-2
      text-left w-full md:w-1/2 text-gray-900 dark:text-gray-100
      rounded-xl p-2 md:p-4 bg-gray-100 dark:bg-gray-800'
    >
      <div className={`w-1/6 flex justify-center items-center ${prod.image ? 'h-full' : 'h-14 md:h-20'} md:px-4 bg-white rounded-md`}>
        { prod.image ? (
              <img src={`${prod.image}`} alt={prod.name} className="p-1 h-fit max-h-20 md:p-2"/>
          ) : <ArchiveBoxXMarkIcon className="h-8 md:h-12 text-gray-600 opacity-20"/>
        }
      </div>
      <div className="w-4/6">
        <div className="flex flex-row gap-2 font-semibold text-xs md:text-base lowercase items-center">
          <span>{ `${prod.name} ${prod.subName} - ${prod.size}${prod.unitMeasure}` }</span>
        </div>
        <div className="dark:text-gray-500 font-light text-xs uppercase">
          <h2>{ prod.manufacturer }</h2>
          <h2>{ `Cod: ${prod.code}` }</h2>
        </div>
      </div>
      <div className='w-1/6 flex justify-end'>
        <PencilSquareIcon
          onClick={() => {
            setEditProd(prod)
            setShowProd('update')
          }}
          className='w-8 h-8 cursor-pointer duration-300 ease-in-out hover:text-red-500' />
      </div>
    </li>
  )
};

export default ProductCard;
