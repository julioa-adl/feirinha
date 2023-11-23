import { useState, useEffect } from 'react';
import { ArchiveBoxXMarkIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { useQuery } from 'react-query';
import { fetchProducts } from '../helpers/httpClient/productClient';

const SelectGeneral = ({setMyState}) => {
  const [view, setView] = useState(false);
  const [infos, setInfos] = useState({
    id: '',
    name: ''
  });

  const { data } = useQuery('products', () => fetchProducts(), {retry: 10});
  const productsSort = data && data.sort((a,b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  });

  useEffect(() => {
    const { id, name } = infos;
    setMyState((prevstate) => ({
      ...prevstate,
      productId: id,
      productName: name,
    }))
  }, [infos, setMyState])

  return (
    <div className='relative w-full'>
      
      <div
        className="flex justify-between items-center p-2 w-full h-8 rounded-md bg-gray-200 dark:bg-gray-700 cursor-pointer
        hover:bg-gray-50 dark:hover:bg-gray-600 ease-in-out duration-300"
        onClick={() => setView(!view)}
      >
        <h1 className={`text-center text-xs ${infos.name ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500'}`}>{infos.name ? infos.name : 'Selecione um Produto'}</h1>
        <ChevronUpDownIcon className="h-6 text-gray-900 dark:text-gray-100"/>
      </div>
      <div className='fixed -z-10 top-0 left-0 w-screen h-screen' onClick={() => setView(false)}/>
      { view &&
        <ul className='absolute z-10 -top-48 -left-5 w-80 h-96 overflow-x-hidden overflow-y-scroll p-2 flex flex-col gap-1 bg-gray-200 dark:bg-gray-700
        text-gray-900 dark:text-gray-100 rounded-md shadow-inner'>
          {
            productsSort && productsSort.map((prod) => (
              <li
                key={`lista-produtos-feirinha-${prod._id}`}
                className='flex justify-between items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md cursor-pointer'
                onClick={() => {
                  setInfos((prevstate) => ({
                  ...prevstate,
                  id: prod._id,
                  name: prod.name,
                }))
                setView(false);
                }}
              >
                <div className='flex justify-center items-center w-8 h-8 bg-white rounded-sm overflow-hidden shadow-md'>
                  {prod.image ? (<img src={prod.image} alt={prod.name} className='max-h-20'/>) : <ArchiveBoxXMarkIcon className="h-5 text-gray-600 opacity-20"/>}
                </div>
                <div className='flex flex-col w-full lowercase'>
                  <h1 className='text-xs font-medium'>{`${prod.name} - ${prod.subName}`}</h1>
                  <h2 className='text-xs font-thin'>{`${prod.manufacturer} - ${prod.size}${prod.unitMeasure}`}</h2>
                  <hr className='h-0.5 opacity-10 bg-gray-500'/>
                </div>
              </li>
            ))
          }
        </ul>
      }
    </div>
  )
}

export default SelectGeneral;
