import myImages from '../../assets/images';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const AlredyRegistered = () => {
  return (
    <>
      <h1 className='text-yellow-500 text-6xl text-center font-thin'>EEITA!</h1>
      <p className='text-yellow-500 text-xl text-center'>Já ta cadastrado XD</p>
      <div className='flex w-full justify-center items-center py-14'>
        <img className='h-48' src={myImages.banana} alt="banana aviso" />
        <ExclamationTriangleIcon className='h-24 text-yellow-400 animate-bounce' />
      </div>
    </>
  )
}

export default AlredyRegistered;
