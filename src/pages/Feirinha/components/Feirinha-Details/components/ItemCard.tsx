import { ArchiveBoxXMarkIcon, ArrowPathIcon, MinusIcon, PlusIcon, TrashIcon,
  PlusCircleIcon, CurrencyDollarIcon, PencilSquareIcon, ArrowUpTrayIcon, BanknotesIcon,
  ArrowTrendingUpIcon, ArrowTrendingDownIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { IlistCart } from "../../../../../interfaces/IFeirinha";
import { deleteItem, updateItem } from '../../../../../helpers/httpClient/cartClient';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProducts } from '../../../../../helpers/httpClient/productClient';
import { ChangeEvent, useEffect, useState } from 'react';
import Loading from '../../../../../general-components/Loading';
import { getAllByProductId } from '../../../../../helpers/httpClient/feirinhaClient';
// import { fetchAllFeirinhas } from '../../../../../helpers/httpClient/feirinhaClient';

interface itemCard {
  listCart: IlistCart,
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

  useEffect(() => {
    setShowEdit(false); // Resetar showEdit quando a prop listCart mudar
  }, [listCart]);

  const { id: feirinhaId } = useParams();

  useEffect(() => {
    const {quantity, price} = editItem;
    if (
      Number(quantity) > 0 &&
      Number(price) > 0 ) {
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

  const { mutate: upBuyed, isLoading: buyedLoading } = useMutation(() => updateItem(feirinhaId, editItem).then(
    () => querieClient.invalidateQueries('feirinhas')
  ))
  const handleUpdateBuyed = async () => {
    upBuyed();
  };

  useEffect(() => {
    if (isSuccess) {
      setShowEdit(false)
    }
  }, [isSuccess])

  useEffect(() => {
    handleUpdateBuyed()
  }, [editItem.buyed])

  const { data: statisticsData } = useQuery(`statistics-${listCart['_id']}`, () => getAllByProductId(listCart['productId']), {retry: 10});
  const media = statisticsData && statisticsData.reduce((acc, cur) => acc + Number(cur.price), 0) / statisticsData.length;

  const upOrDownPriceByMedia = () => {
    const thisPrice = listCart && listCart.price;
    if (!media) return <span>X</span>
    if (Number(thisPrice) > Number(media)) {
      return <><strong className='uppercase text-red-400'>R$ {media}</strong><ArrowTrendingUpIcon className='h-4 text-red-400'/></>
    } if (Number(thisPrice) < Number(media)) {
      return <><strong className='uppercase text-green-500'>R$ {media}</strong><ArrowTrendingDownIcon className='h-4 text-green-500'/></>
    }
    return <><strong className='uppercase text-yellow-500'>R$ {media}</strong><ArrowLongRightIcon className='h-4 text-yellow-500'/></>
  }

  setInterval(() => {
    querieClient.invalidateQueries(`statistics-${listCart['_id']}`)
  }, 5000)


  const { mutate: delItem, isLoading: deleteLoading } = useMutation(() => deleteItem(feirinhaId, listCart['_id']).then(
    () => querieClient.invalidateQueries('feirinhas')
  ))
  const handleDelete = async () => {
    delItem();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    if (id === 'buyed') {
      setEditItem((prevstate) => ({
        ...prevstate,
        buyed: !editItem.buyed,
      }));
      return;
    }
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

  const history = useNavigate();
  const goToProductDetails = (id) => {
    history(`/produtos/${id}`);
  };

  return(
    <li
      className={`flex justify-between items-center gap-1 ease-in-out duration-300
      text-left w-full md:w-1/2 text-gray-900 dark:text-gray-100
      rounded-xl p-2 bg-gray-50 dark:bg-gray-800 ${showEdit ? 'h-28' : 'h-24 md:h-28'}`}
    >

      <div
        className='w-1/5 flex justify-center items-center h-full overflow-hidden bg-white rounded-md shadow-md
        border-2 border-gray-100 dark:border-gray-800 hover:border-lime-500 dark:hover:border-lime-500 duration-300 ease-in-out'
        onClick={() => goToProductDetails(prod._id) }
      >
        {prod && prod.image ? (<img src={prod.image} alt={prod.name} className='scale-110 hover:scale-125 cursor-pointer duration-300 ease-in-out'/>) : <ArchiveBoxXMarkIcon className="h-10 text-gray-600 opacity-20"/>}
      </div>
      <div className="w-3/5 md:w-full h-full">
        <div className="flex flex-row items-start justify-between h-full font-regular text-xs md:text-base lowercase">

          <div className='flex flex-col items-start justify-between h-full w-full'>

            <div className='flex justify-between w-full'>
              <div className='flex items-center gap-1'>
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
                {
                  statisticsData && <p className='text-gray-400 text-xs flex gap-1'>
                    preço médio: {upOrDownPriceByMedia()}
                  </p>
                }
              </div>
              <span className="text-xs font-thin">{ prod && `${prod.size}${prod.unitMeasure}` }</span>
              
            </div>

            <span className="w-full text-start font-thin">{ prod && `${prod.name.slice(0, 30)} ${prod.subName.slice(0, 15)} ${prod.manufacturer.slice(0, 10)}` }</span>

            <span className='flex items-center justify-between w-full p-1 rounded-sm bg-gray-100 dark:bg-gray-700'>

              <span className='flex gap-1 items-center'>
                <PlusCircleIcon className='h-4 text-gray-500'/>
                <p className=''>{listCart && prod && `${listCart.quantity} ${prod.unitSelling}`}</p>
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
            
              <form
                className={`ease-in-out duration-300 ${!showEdit ? 'scale-0' : 'scale-100'} flex items-end gap-1 justify-between static dark:bg-gray-600 w-full`}
              >

                <div className='flex flex-col w-2/6'>
                  {/* <label className='text-xs text-gray-100 font-thin mb-1'>quantidade</label> */}
                  <div className="flex h-6 text-xs">
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
                      onFocus={() => {
                        if (editItem.quantity === 0) {
                          setEditItem((prevstate) => ({
                            ...prevstate,
                            quantity: '',
                          }))
                        }
                      }}
                      onBlur={() => {
                        if (editItem.quantity === '') {
                          setEditItem((prevstate) => ({
                            ...prevstate,
                            quantity: 0,
                          }))
                        }
                      }}
                      className=" text-center w-8 h-6 outline-none text-xs p-0 text-gray-900
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

                <div className='flex flex-col justify-center items-center w-2/6'>
                  {/* <label className='text-xs text-gray-100 font-thin mb-1'>preço</label> */}
                  <input
                    type="number"
                    id='price'
                    value={ editItem.price }
                    onChange={ handleChange }
                    onFocus={() => {
                      if (editItem.price === 0) {
                        setEditItem((prevstate) => ({
                          ...prevstate,
                          price: '',
                        }))
                      }
                    }}
                    onBlur={() => {
                      if (editItem.price === '') {
                        setEditItem((prevstate) => ({
                          ...prevstate,
                          price: 0,
                        }))
                      }
                    }}
                    className=" text-center w-3/4 h-6 rounded-sm outline-none text-xs p-0 text-gray-900
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
                  onClick={ (e) => {
                    e.preventDefault()
                    handleUpdate()
                  } }
                >
                  { updateLoading ? <Loading loading /> : <ArrowUpTrayIcon  className='h-3'/> }
                </button>

              </form>
            
          </div>
        </div>
      </div>
      
      <div className='flex flex-col h-full justify-between items-end px-1 gap-2'>
        <div className='relative flex justify-center items-center'>
          <input
            type="checkbox"
            className='form-checkbox h-8 w-8 cursor-pointer rounded-full border-blue-500 dark:border-blue-400 border-2 bg-gray-50 dark:bg-gray-800 text-green-600 focus:ring-green-200'
            id='buyed'
            checked={editItem.buyed}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          { buyedLoading &&
            <div className='absolute m-auto rounded-full p-1 border-blue-500 dark:border-blue-400 border-2 bg-gray-50 dark:bg-gray-800'>
              <ArrowPathIcon className='h-6 text-blue-500 animate-spin'/>
            </div>
          }
        </div>
        <p className="text-center text-xs font-normal"><BanknotesIcon className='h-3 text-green-500'/> { (Number(listCart.price) * Number(listCart.quantity)).toFixed(2) }</p>
      </div>
    </li>
  )
};

export default ItemCard;
