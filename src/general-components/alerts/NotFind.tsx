import myImages from '../../assets/images';
import { XCircleIcon } from '@heroicons/react/24/outline';

const NotFind = () => {
  return (
    <>
      <h1 className='text-yellow-500 text-6xl text-center font-thin'>OOPS!</h1>
      <p className='text-yellow-500 text-xl text-center'>Achei isso não D=</p>
      <div className='flex w-full justify-center py-14'>
        <img className='h-48' src={myImages.batata} alt="banana aviso" />
        <XCircleIcon className='h-10 text-yellow-500 animate-pulse' />
      </div>
    </>
  )
}

export default NotFind;
