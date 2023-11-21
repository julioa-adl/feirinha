import { /*ArchiveBoxXMarkIcon,*/ ArrowPathIcon, TrashIcon, /*PlayIcon, CheckIcon, PencilSquareIcon*/ } from '@heroicons/react/24/outline';
import { IlistCart } from "../../../../../interfaces/IFeirinha";
import { deleteItem } from '../../../../../helpers/httpClient/cartClient';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../../../../helpers/httpClient/productClient';

interface itemCard {
  listCart: IlistCart
}

const ItemCard = ({ listCart }:itemCard) => {
  const { id: feirinhaId } = useParams();

  const { data: products } = useQuery('products', () => fetchProducts(), {retry: 10});
  const prod = products && products.find((p) => p._id === listCart.productId)

  const querieClient = useQueryClient();
  // const { mutate: upItem, isLoading: updateLoading, isSuccess: updateSucess, isError: updateError } = useMutation(() => updateItem(feirinhaId, addItem).then(
  //   () => querieClient.invalidateQueries('feirinhas')
  // ))
  // const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   upItem();
  // };

  const { mutate: delItem, isLoading: deleteLoading } = useMutation(() => deleteItem(feirinhaId, listCart['_id']).then(
    () => querieClient.invalidateQueries('feirinhas')
  ))
  const handleDelete = async () => {
    delItem();
  };

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

      {/* <div className='flex justify-center items-center w-8 h-8 bg-white rounded-sm p-1'>
        {prod && prod.image ? (<img src={prod.image} alt={prod.name} className='h-7'/>) : <ArchiveBoxXMarkIcon className="h-5 text-gray-600 opacity-20"/>}
      </div> */}
      <div className="w-4/6">
        <div className="flex flex-row gap-2 font-regular text-xs md:text-base lowercase items-center">
          <span className="w-full text-center">{ prod.name }</span>
          <span className="w-full text-center">{ listCart.price }</span>
          <span className="w-full text-center">{ listCart.quantity }</span>
        </div>
      </div>
      <div className='w-1/6 flex justify-end'>
        { !deleteLoading ? (
          <TrashIcon
            onClick={() => {
              handleDelete()
            }}
            className='h-5 cursor-pointer duration-300 ease-in-out hover:text-yellow-500'
          />
        ) : ( 
          <ArrowPathIcon className="w-6 h-6 animate-spin text:red-500 dark:text:gray-100"/>
        )
        }
      </div>
    </li>
  )
};

export default ItemCard;
