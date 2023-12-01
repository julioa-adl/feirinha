import { useState, useEffect, useCallback } from 'react';
import { PhotoIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface mySelect {
  img?: string,
  title: string[],
  subTitle?: string[],
  setMyState: React.Dispatch<React.SetStateAction<any>>,
  selected?: string,
  setNotFind?: React.Dispatch<React.SetStateAction<boolean>>,
  arrayToSelect: any[]
}

const SelectGeneral = ({ img, title, subTitle, setMyState, selected, setNotFind, arrayToSelect }: mySelect) => {
  const [view, setView] = useState(false);
  const [search, setSearch] = useState('');
  const [itensSearching, setItensSearching] = useState<any[]>([]);
  const [infos, setInfos] = useState<object | undefined | string>();

  function replaceSpecialChars(str) {
    str = str.replace(/[ÀÁÂÃÄÅ]/g, "A");
    str = str.replace(/[àáâãäå]/g, "a");
    str = str.replace(/[ÈÉÊË]/g, "E");
    str = str.replace(/[èéêë]/g, "e");
    str = str.replace(/[ÌÍÎÏ]/g, "I");
    str = str.replace(/[ìíîï]/g, "i");
    str = str.replace(/[ÒÓÔÕÖØ]/g, "O");
    str = str.replace(/[òóôõöø]/g, "o");
    str = str.replace(/[ÙÚÛÜ]/g, "U");
    str = str.replace(/[ùúûü]/g, "u");
    str = str.replace(/[ÝŸ]/g, "Y");
    str = str.replace(/[ýÿ]/g, "y");
    str = str.replace(/[Ç]/g, "C");
    str = str.replace(/[ç]/g, "c");
    return str.replace(/[^a-z0-9]/gi, '');
}

  const filtrarProduto = useCallback((pesquisa) => {
    const termoPesquisa = replaceSpecialChars(pesquisa.toLowerCase());
    const resultados = arrayToSelect && arrayToSelect.filter(item =>
      Object.values(item).some(valor =>
      replaceSpecialChars(String(valor).toLowerCase()).includes(termoPesquisa)
      )
    );
    return resultados;
  }, [arrayToSelect]);

  useEffect(() => {
    const resultSearch = filtrarProduto(search)
    setItensSearching(resultSearch ? resultSearch : [])
  }, [search])

  useEffect(() => {
    setInfos(() => undefined)

    if (selected) {
      const sectedItem = arrayToSelect && arrayToSelect.find((item) => Object.values(item).some(valor =>
        String(valor).includes(selected)
        )
      );
      if (sectedItem) {
        setMyState(sectedItem)
        setInfos(sectedItem)
        return
      } else if (setNotFind) {
        setNotFind(true)
        setTimeout(() => {
          setNotFind(false)
        }, 10000)
      }
    }
  }, [selected])

  return (
    <div className='relative w-full'>

      <div
        className={`flex justify-between items-center py-2 pr-2 ${img === 'none' && 'pl-2'} w-full h-8 rounded-md bg-gray-200 dark:bg-gray-700 cursor-pointer
        hover:bg-gray-50 dark:hover:bg-gray-600 ease-in-out duration-300 overflow-hidden`}
        onClick={() => setView(!view)}
      >
        {infos ? (
          <div className='flex w-5/6 gap-1 items-center justify-start text-gray-900 dark:text-gray-100'>
            {img !== 'none' &&
              <div className='flex justify-center items-center w-8 h-8 bg-white rounded-sm overflow-hidden shadow-md'>
                {img && infos && infos[img] ? <img src={infos[img]} alt={infos[title[0]]} className='h-6'/> : <PhotoIcon className="h-4 text-gray-600 opacity-20"/>}
              </div>
            }
            <div className='flex flex-col w-5/6 lowercase'>
              <h1 className='text-xs font-medium truncate'>{infos && title.map(t => `${infos[t]} `)}</h1>
              <h2 className='text-xs font-thin truncate -mt-1'>{infos && subTitle && subTitle.map(t => `${infos[t]} `)}</h2>
            </div>
          </div>
         ) : <h1 className='text-gray-500 p-2 text-xs'>Clique para Selecionar</h1>}

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
              autoFocus
              placeholder={`Buscar Item`}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className='rounded-md text-sm px-4 pl-8 py-2 w-full bg-gray-100 text-gray-900 focus:outline-none'
            />
          </div>
          <ul className='overflow-x-hidden overflow-y-scroll'>

          {
            itensSearching && itensSearching.map((item, i) => (
              <li
                key={`lista-produtos-feirinha-${item['_id']}-${item[1]}-${i}`}
                className='flex justify-between items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md cursor-pointer'
                onClick={() => {
                  setInfos(item);
                  setMyState(item);
                  setView(false);
                }}
              >
                {img !== 'none' &&
                  <div className='flex justify-center items-center w-8 h-8 bg-white rounded-sm overflow-hidden shadow-md'>
                    {img && item[img] ? (<img src={item[img]} className='scale-100'/>) : <PhotoIcon className="h-5 text-gray-600 opacity-20"/>}
                  </div>
                }
                <div className='flex flex-col justify-center w-full lowercase'>
                  <h1 className='text-xs font-medium'>{item && title.map(t => `${item[t]} `)}</h1>
                  <h2 className='text-xs h-4 font-thin'>{item && subTitle && subTitle.map(t => `${item[t]} `)}</h2>
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
