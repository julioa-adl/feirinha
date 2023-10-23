import { PencilSquareIcon } from '@heroicons/react/24/outline';

const ProductCard = ({ prod }) => {
  return(
    <li
      className='flex justify-between items-center
      text-left w-full md:w-1/2 text-gray-900 dark:text-gray-100
      rounded-xl p-2 md:px-8 md:py-4 bg-gray-100 dark:bg-gray-800'
    >
      <div>
        <div className="flex flex-row gap-2 font-bold text-sm md:text-base">
          <span>{ prod.name }</span>
          <span>{ prod.subName }</span>
          <span>{ prod.size }</span>
          <span>{ prod.unitMeasure }</span>
        </div>
        <div className="dark:text-gray-500 font-light text-sm">
          <h2>{ prod.manufacturer }</h2>
          <h2>{ `Cod: ${prod.code}` }</h2>
        </div>
      </div>
      <div className='w-1/6 flex justify-end'>
        <PencilSquareIcon className='w-8 h-8 cursor-pointer duration-300 ease-in-out hover:text-red-500' />
      </div>
    </li>
  )
};

export default ProductCard;