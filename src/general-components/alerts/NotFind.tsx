import batata from '../../assets/batata.png';
import { XCircleIcon } from '@heroicons/react/24/outline';

const NotFind = () => {
  return (
    <>
      <h1 className='text-yellow-500 text-3xl text-center'>Achei isso não D=</h1>
      <div className='flex w-full justify-center py-14'>
        <img className='h-48' src={batata} alt="banana aviso" />
        <XCircleIcon className='h-10 text-yellow-500 animate-pulse' />
      </div>
    </>
  )
}

export default NotFind;
