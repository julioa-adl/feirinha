import { useState, useEffect, ChangeEvent } from 'react';
import { ArchiveBoxXMarkIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useQuery } from 'react-query';
import { fetchProducts } from '../helpers/httpClient/productClient';

const SelectGeneral = ({setMyState, scanner, setNotFind}) => {
  const [view, setView] = useState(false);
  const [infos, setInfos] = useState({
    id: '',
    name: '',
    image: '',
    unitMeasure: '',
    size: '',
    searching: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setInfos((prevstate) => ({
      ...prevstate,
      [id]: value,
    }));
  }

  const { data } = useQuery('products', () => fetchProducts(), {retry: 10});
  const productsSort = data && data.sort((a,b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  });

  const filterProd = data && productsSort.filter(prodF => ((`${prodF.name} ${prodF.subName} ${prodF.size}${prodF.unitMeasure}`).toLowerCase().includes(infos.searching.toLowerCase() || '')))

  useEffect(() => {
    if (scanner.length > 0) {
      const scannerProd = data && data.find((prodData) => prodData.code === scanner);
      console.log(scannerProd)
      if (scannerProd) {
        setInfos((prevstate) => ({
          ...prevstate,
          id: scannerProd['_id'],
          name: scannerProd.name,
          image: scannerProd.image,
          unitMeasure: scannerProd.unitMeasure,
          size: scannerProd.size
        }));
      } else {
        setNotFind(true)
        setTimeout(() => {
          setNotFind(false)
        }, 5000)
      }
    }
  }, [scanner])

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
        <h1 className={`text-center text-xs ${infos.name ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500'}`}>{infos.name ? (
          <span className='flex items-center gap-2 lowercase'>
            {infos.image ? <img src={infos.image} alt={infos.name} className='h-6'/> : <ArchiveBoxXMarkIcon className="h-4 text-gray-600 dark:text-gray-100 opacity-20"/>}
            { `${infos.name} - ${infos.size}${infos.unitMeasure}` }</span>
          ) : 'Selecione um Produto'}</h1>
        <ChevronUpDownIcon className="h-6 text-gray-900 dark:text-gray-100"/>
      </div>
      <div className='fixed -z-10 top-0 left-0 w-screen h-screen bg-black opacity-60' onClick={() => setView(false)}/>
      { view &&
        <div className='absolute z-10 -top-20 -left-5 w-80 h-96 p-2 flex flex-col gap-1 bg-gray-200 dark:bg-gray-700
        text-gray-900 dark:text-gray-100 rounded-md shadow-inner'>
          <div className='relative mb-2'>
            <MagnifyingGlassIcon
              className='h-4 absolute text-gray-400 top-2.5 left-3'
            />
            <input
              type="search"
              id='searching'
              placeholder={`Buscar Item`}
              onChange={handleChange}
              value={infos.searching}
              className='rounded-md text-sm px-4 pl-8 py-2 w-full bg-gray-100 text-gray-900 focus:outline-none'
            />
          </div>
          <ul className='overflow-x-hidden overflow-y-scroll'>

          {
            filterProd && filterProd.map((prod) => (
              <li
                key={`lista-produtos-feirinha-${prod._id}`}
                className='flex justify-between items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md cursor-pointer'
                onClick={() => {
                  setInfos((prevstate) => ({
                  ...prevstate,
                  id: prod._id,
                  name: prod.name,
                  image: prod.image,
                  unitMeasure: prod.unitMeasure,
                  size: prod.size
                }))
                setView(false);
                }}
              >
                <div className='flex justify-center items-center w-8 h-8 bg-white rounded-sm overflow-hidden shadow-md'>
                  {prod.image ? (<img src={prod.image} alt={prod.name} className='scale-100'/>) : <ArchiveBoxXMarkIcon className="h-5 text-gray-600 opacity-20"/>}
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
        </div>
      }
    </div>
  )
}

export default SelectGeneral;
