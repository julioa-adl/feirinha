import { ShoppingCartIcon, PencilSquareIcon, TrashIcon, /*PlayIcon, CheckIcon*/ } from '@heroicons/react/24/outline';
import { IlistCart } from "../../../../../interfaces/IFeirinha";

interface itemCard {
  listCart: IlistCart
}

const ItemCard = ({ listCart }:itemCard) => {
  return(
    <li
      className='flex justify-between items-center gap-2
      text-left w-full md:w-1/2 text-gray-900 dark:text-gray-100
      rounded-xl p-2 md:p-4 bg-gray-50 dark:bg-gray-800'
    >
      <input
        type="checkbox"
        className='form-checkbox h-6 w-6 cursor-pointer rounded-full border-green-300 bg-gray-50 text-green-600 focus:ring-green-200'
      />

      <ShoppingCartIcon className="h-6 text-yellow-500"/>
      <div className="w-4/6">
        <div className="flex flex-row gap-2 font-regular text-xs md:text-base lowercase items-center">
          <span className="w-full text-center">{ listCart.productName }</span>
          <span className="w-full text-center">{ listCart.price }</span>
          <span className="w-full text-center">{ listCart.quantity }</span>
        </div>
      </div>
      <div className='w-1/6 flex justify-end'>
        <TrashIcon
          onClick={() => {console.log(listCart)}}
          className='h-5 cursor-pointer duration-300 ease-in-out hover:text-yellow-500' />
      </div>
    </li>
  )
};

export default ItemCard;
