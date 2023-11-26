import myImages from '../../assets/images';
import { NoSymbolIcon } from '@heroicons/react/24/outline';

const Error = () => {
  return (
    <>
      <h1 className='text-red-500 text-4xl text-center font-thin'>CARAMBA!</h1>
      <p className='text-red-500 text-xl text-center'>A requisição Falou D,:</p>
      <div className='flex w-full justify-center py-14'>
        <img className='h-48 animate-bounce' src={myImages.laranja} alt="banana aviso" />
        <NoSymbolIcon className='h-10 text-red-400 animate-ping' />
      </div>
    </>
  )
}

export default Error;
