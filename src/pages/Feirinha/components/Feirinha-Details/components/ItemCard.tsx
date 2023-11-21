import { ArchiveBoxXMarkIcon, ArrowPathIcon, MinusIcon, PlusIcon, TrashIcon,
  PlusCircleIcon, CurrencyDollarIcon, PencilSquareIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { IlistCart } from "../../../../../interfaces/IFeirinha";
import { deleteItem, updateItem } from '../../../../../helpers/httpClient/cartClient';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../../../../helpers/httpClient/productClient';
import { ChangeEvent, useEffect, useState } from 'react';
import Loading from '../../../../../general-components/Loading';

interface itemCard {
  listCart: IlistCart
}

const ItemCard = ({ listCart }:itemCard) => {
  const [disable, setDisable] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [editItem, setEditItem] = useState<IlistCart>({
    id: listCart ? listCart._id : '',
    productId: listCart ? listCart.productId : '',
    productName: listCart ? listCart.productName : '',
    quantity: listCart ? listCart.quantity : 0,
    price: listCart ? listCart.price : 0,
    buyed: listCart ? listCart.buyed : false
  })

  const { id: feirinhaId } = useParams();

  useEffect(() => {
    const {quantity, price} = editItem;
    if (
      quantity > 0 &&
      price > 0 ) {
        return setDisable(false);
      }
    return setDisable(true);
  }, [editItem])

  const { data: products } = useQuery('products', () => fetchProducts(), {retry: 10});
  const prod = products && products.find((p) => p._id === listCart.productId)

  const querieClient = useQueryClient();
  const { mutate: upItem, isLoading: updateLoading, isSuccess } = useMutation(() => updateItem(feirinhaId, editItem).then(
    () => querieClient.invalidateQueries('feirinhas')
  ))
  const handleUpdate = async () => {
    upItem();
  };

  useEffect(() => {
    if (isSuccess) {
      setShowEdit(false)
    }
  }, [isSuccess])

  const { mutate: delItem, isLoading: deleteLoading } = useMutation(() => deleteItem(feirinhaId, listCart['_id']).then(
    () => querieClient.invalidateQueries('feirinhas')
  ))
  const handleDelete = async () => {
    delItem();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setEditItem((prevstate) => ({
      ...prevstate,
      [id]: value,
    }));
  }

  const incrementSize = () => {
    setEditItem((prevState) => ({
      ...prevState,
      quantity: Number(prevState.quantity) + 1,
    }));
  };
  
  const decrementSize = () => {
    if (Number(editItem.quantity) >= 1) {
      setEditItem((prevState) => ({
        ...prevState,
        quantity: Number(prevState.quantity) - 1,
      }));
    }
  };

  return(
    <li
      className='flex justify-between items-center gap-1
      text-left w-full md:w-1/2 text-gray-900 dark:text-gray-100
      rounded-xl p-2 md:p-4 bg-gray-50 dark:bg-gray-800'
    >

      <div className='w-1/5 flex justify-center items-center h-full md:h-20 overflow-hidden bg-white rounded-sm shadow-md'>
        {prod && prod.image ? (<img src={prod.image} alt={prod.name} className='w-full'/>) : <ArchiveBoxXMarkIcon className="h-10 text-gray-600 opacity-20"/>}
      </div>
      <div className="w-full h-full">
        <div className="flex flex-row items-start justify-between h-full font-regular text-xs md:text-base lowercase">

          <div className='flex flex-col items-start justify-between h-full w-full'>

            <div className='flex justify-between w-full'>
              { !deleteLoading ? (
                <TrashIcon
                  onClick={() => {
                    handleDelete()
                  }}
                  className='h-4 cursor-pointer duration-300 ease-in-out hover:text-yellow-500'
                />
              ) : ( 
                <ArrowPathIcon className="h-4 animate-spin text:red-500 dark:text:gray-100"/>
              )
              }
              <div className='flex items-center justify-between w-24'>
                <h2 className='text-gray-500 dark:text-gray-400 font-normal'>total: </h2>
                <p className="text-center text-xs font-medium">{ (Number(listCart.price) * Number(listCart.quantity)).toFixed(2) }</p>
              </div>
            </div>

            <span className="w-full text-start font-thin">{ prod && `${prod.name} ${prod.subName} ${prod.manufacturer}` }</span>

            <span className='flex items-center justify-between w-full p-1 rounded-sm bg-gray-100 dark:bg-gray-700'>

              <span className='flex gap-1 items-center'>
                <PlusCircleIcon className='h-4 text-gray-500'/>
                <p className=''>{listCart && `${listCart.quantity}`}</p>
              </span>

              <span className='flex gap-1 items-center'>
                <CurrencyDollarIcon className='h-4 text-gray-500'/>
                <p className=''>{listCart && `${Number(listCart.price).toFixed(2)}`}</p>
              </span>
            
              <PencilSquareIcon
                className='h-5 text-yellow-500 hover:text-red-500 cursor-pointer'
                onClick={() => setShowEdit(!showEdit)}
              />
            </span>
            
            { showEdit && (
              <div className='flex items-end gap-1 justify-between static pl-2 dark:bg-gray-600 w-full'>

                <div className='flex flex-col w-2/6'>
                  <label className='text-xs text-gray-100 font-thin mb-1'>quantidade</label>
                  <div className="flex h-4 text-xs">
                    <div
                      onClick={ decrementSize }
                      className="group bg-gray-500 cursor-pointer hover:bg-red-300
                      ease-in-out duration-300 flex items-center justify-center p-1
                      rounded-l-sm">
                      <MinusIcon
                        className="text-gray-100 group-hover:text-gray-600 h-3"/>
                    </div>
                    <input
                      min="0"
                      type="number"
                      id='quantity'
                      value={ editItem.quantity }
                      onChange={ handleChange }
                      className=" text-center w-8 h-4 outline-none text-xs p-0 text-gray-900
                      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                      [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <div
                      onClick={ incrementSize }
                      className="group bg-gray-500 cursor-pointer hover:bg-green-300
                      ease-in-out duration-300  flex items-center justify-center p-1
                      rounded-r-sm">
                      <PlusIcon
                        className="text-gray-100 group-hover:text-gray-600 h-3"/>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col w-2/6'>
                  <label className='text-xs text-gray-100 font-thin mb-1'>preço</label>
                  <input
                    type="number"
                    id='price'
                    value={ editItem.price }
                    onChange={ handleChange }
                    className=" text-center w-3/4 h-4 rounded-sm outline-none text-xs p-0 text-gray-900
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                    [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={ disable }
                  className={`flex justify-center text-center items-center font-medium
                  text-sm px-2 py-1 w-1/6 h-full text-white
                  ${ disable ? 'bg-blue-400 opacity-50'
                  : 'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-1 dark:bg-blue-600 dark:hover:bg-blue-700'}`}
                  onClick={ () => handleUpdate() }
                >
                  { updateLoading ? <Loading loading /> : <ArrowUpTrayIcon  className='h-3'/> }
                </button>

              </div>
              )
            }
            
          </div>
        </div>
      </div>
      
      <div className='flex flex-col h-full justify-between items-end px-1'>
        <input
          type="checkbox"
          className='form-checkbox h-8 w-8 cursor-pointer rounded-full border-green-300 bg-gray-50 text-green-600 focus:ring-green-200'
        />

        <span className="text-xs font-thin">{ prod && `${prod.size}${prod.unitMeasure}` }</span>
      </div>
    </li>
  )
};

export default ItemCard;
