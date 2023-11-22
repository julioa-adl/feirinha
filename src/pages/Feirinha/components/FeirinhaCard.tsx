import { useContext } from "react";
import context from '../../../context/myContext';
import { PencilSquareIcon, PauseIcon, /*PlayIcon, CheckIcon*/ } from '@heroicons/react/24/solid';
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
    const dataFormatada = format(dataUTC, "dd 'de' MMMM 'de' yyyy");
    return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  };
  
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
      className='flex justify-between items-center
      text-left w-full md:w-1/2 text-gray-900 dark:text-gray-100
      rounded-xl p-2 md:p-4 bg-gray-50 dark:bg-gray-800'
    >
      <Link to={`feirinha/${feirinha._id}`} className="w-1/6">
        <PauseIcon className="h-6 text-yellow-500"/>
      </Link>

      <Link to={`feirinha/${feirinha._id}`} className="w-4/6">
        <div className="flex flex-row gap-2 font-regular text-xs md:text-base lowercase items-center">
          <span className="w-full text-center">{ `${formatarData(feirinha.date)}` }</span>
        </div>
        <div className="dark:text-gray-500 font-light text-xs md:text-sm">
          <h2 className="w-full text-center">{ mercado.name } - { mercado.neighborhood } - { mercado.state }</h2>
        </div>
        <div className="dark:text-gray-500 font-light text-xs md:text-sm">
          <h2 className="w-full text-center">disponível para gastar: R${ feirinha.availableToSpend }</h2>
        </div>
      </Link>
      <div className='w-1/6 flex justify-end gap-1'>
        <PencilSquareIcon
          onClick={() => {
            setEditFeirinha(feirinha)
            setShowFeirinha('update')
          }}
          className='w-8 h-8 cursor-pointer duration-300 ease-in-out hover:text-yellow-500' />
        { !deleteLoading ? (
          <TrashIcon
            onClick={() => {
              handleDelete()
            }}
            className='w-8 h-8 cursor-pointer duration-300 ease-in-out hover:text-yellow-500'
          />
        ) : ( 
          <ArrowPathIcon className="w-6 h-6 animate-spin text:red-500 dark:text:gray-100"/>
        )
        }
      </div>
    </li>
  )
};

export default FeirinhaCard;
