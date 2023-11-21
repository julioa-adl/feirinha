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
      className='flex justify-between items-center gap-1
      text-left w-full md:w-1/2 text-gray-900 dark:text-gray-100
      rounded-xl p-2 md:p-4 bg-gray-50 dark:bg-gray-800'
    >
      <input
        type="checkbox"
        className='form-checkbox h-6 w-6 mr-2 cursor-pointer rounded-full border-green-300 bg-gray-50 text-green-600 focus:ring-green-200'
      />

      {/* <div className='flex justify-center items-center w-8 h-8 bg-white rounded-sm p-1'>
        {prod && prod.image ? (<img src={prod.image} alt={prod.name} className='h-7'/>) : <ArchiveBoxXMarkIcon className="h-5 text-gray-600 opacity-20"/>}
      </div> */}
      <div className="w-full">
        <div className="flex flex-row items-start justify-between font-regular text-xs md:text-base lowercase">

          <div className='flex flex-col items-start w-1/5'>
            <h2 className='text-gray-600 dark:text-gray-400 font-medium'>qtd</h2>
            <p className="w-full text-start font-thin">{ listCart.quantity }</p>
            <h2 className='text-gray-600 dark:text-gray-400 font-medium'>preço</h2>
            <p className="w-full text-start font-thin">{ listCart.price }</p>
          </div>

          <div className='flex flex-col items-center w-3/5'>
            <h2 className='text-gray-600 dark:text-gray-400 font-medium'>produto</h2>
            <p className="w-full text-center font-thin">{ prod && `${prod.name} ${prod.subName} ${prod.size}${prod.unitMeasure}` }</p>
            {/* <p className="w-full text-center font-thin">{ prod && prod.subName }</p> */}
            <p className="w-full text-center font-thin">{ prod && prod.manufacturer }</p>
          </div>

          <div className='flex flex-col items-center w-1/5'>
            <h2 className='text-gray-600 dark:text-gray-400 font-medium'>total</h2>
            <p className="w-full text-center font-thin">{ listCart.price * listCart.quantity }</p>
          </div>

        </div>
      </div>
      <div className='flex justify-end'>
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
