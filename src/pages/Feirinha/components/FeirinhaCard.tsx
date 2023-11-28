import { useContext } from "react";
import context from '../../../context/myContext';
import { PencilSquareIcon, EyeIcon, /*PlayIcon, CheckIcon*/ } from '@heroicons/react/24/solid';
import { TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Ifeirinha } from "../../../interfaces/IFeirinha";
import { Link } from "react-router-dom";
import { format, parseISO, set } from 'date-fns';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchMarkets } from "../../../helpers/httpClient/marketsClient";
import { deleteFeirinha } from "../../../helpers/httpClient/feirinhaClient";

interface feirinhaCards {
  feirinha: Ifeirinha
}

const FeirinhaCard = ({ feirinha }:feirinhaCards) => {
  const {
    setEditFeirinha,
    setShowFeirinha,
  } = useContext(context);

  const formatarData = (dataISO) => {
    const dataUTC = set(parseISO(dataISO), { hours: 24, minutes: 0, seconds: 0 });
    const dataFormatada = format(dataUTC, "dd/MM/yy");
    return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  };

  const totalList = feirinha && feirinha.listCart?.length
  const totalBuyed = feirinha && feirinha.listCart?.reduce((acc, cur) => {
    if (cur.buyed) {
      acc ++;
    }
    return acc;
  }, 0);
  const totalPercent = totalList && totalBuyed && ((totalBuyed / totalList)*100)
  
  const { data: mrkData } = useQuery('markets', () => fetchMarkets(), {retry: 10});

  const mercado = mrkData ? mrkData.find((mrkt) => mrkt['_id'] === feirinha.marketId) : [];

  const querieClient = useQueryClient();
  const { mutate: delFeirinha, isLoading: deleteLoading } = useMutation(() => deleteFeirinha(feirinha['_id']).then(
    () => querieClient.invalidateQueries('feirinhas')
  ))
  const handleDelete = async () => {
    delFeirinha();
  };
  
  return(
    <li
      className='flex justify-between items-center border-2 border-transparent hover:border-lime-600 ease-in-out duration-100
      text-left w-full md:w-1/2 text-gray-900 dark:text-gray-100
      rounded-xl p-2 md:p-4 bg-white dark:bg-gray-800 h-16'
    >
      <Link to={`feirinha/${feirinha._id}`} className="">
        <EyeIcon className="h-6 md:h-8 text-gray-400"/>
      </Link>

      <Link to={`feirinha/${feirinha._id}`} className="flex flex-col items-start w-4/6">
        <div className="flex flex-row w-full font-regular text-xs md:text-base lowercase items-center">
          <p className="w-full text-start truncate">{ `${feirinha.title}` }</p>
        </div>
        <div className="text-gray-400 dark:text-gray-500 font-light text-xs md:text-sm">
          <h2 className="w-full text-start truncate">{ mercado.name } - { mercado.neighborhood } - { mercado.state }</h2>
        </div>


        <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 font-light text-xs md:text-sm w-full">
          <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            { totalList === 0 ? (
              <div className="relative flex items-center justify-center w-full overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800
              p-1 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r
              before:from-transparent before:via-white/90 dark:before:via-white/10 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]">
                <p className="absolute text-gray-400 dark:text-gray-600">iniciar lista</p></div>
            ) : (
              <div style={{
                height:'100%',
                width:`${totalPercent}%`
              }}
              className={`${totalPercent && totalPercent < 100 ? 'bg-yellow-500 dark:bg-yellow-400' : 'bg-green-500 dark:bg-green-400'} rounded-full`}
              />
            )
            }
            
          </div>
          <p>{`${totalBuyed}/${totalList}`}</p>
        </div>
      </Link>

      <div className='w-1/6 h-full flex flex-col justify-between items-start rounded-r-md'>
        <span className="w-full font-semibold text-end text-xs">{ `${formatarData(feirinha.date)}` }</span>
        <div className="w-full h-full flex flex-row justify-between items-end gap-1">
          <PencilSquareIcon
            onClick={() => {
              setEditFeirinha(feirinha)
              setShowFeirinha('update')
            }}
            className='w-5 h-5 cursor-pointer duration-300 ease-in-out hover:text-yellow-500' />
          { !deleteLoading ? (
            <TrashIcon
              onClick={() => {
                handleDelete()
              }}
              className='w-5 h-5 cursor-pointer duration-300 ease-in-out hover:text-red-400'
            />
          ) : ( 
            <ArrowPathIcon className="w-5 h-5 animate-spin text:red-500 dark:text:gray-100"/>
          )
          }
        </div>
      </div>
    </li>
  )
};

export default FeirinhaCard;
