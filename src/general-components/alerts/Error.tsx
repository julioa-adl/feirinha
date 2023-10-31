import laranja from '../../assets/laranja.png';
import { NoSymbolIcon } from '@heroicons/react/24/outline';

const Error = () => {
  return (
    <>
      <h1 className='text-red-400 text-3xl text-center'>Requisição Falou!</h1>
      <div className='flex w-full justify-center py-14'>
        <img className='h-48 animate-bounce' src={laranja} alt="banana aviso" />
        <NoSymbolIcon className='h-10 text-red-400 animate-ping' />
      </div>
    </>
  )
}

export default Error;
