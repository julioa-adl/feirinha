import banana from '../../assets/banana.png';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ProductAlredyRegistered = () => {
  return (
    <>
      <h1 className='text-yellow-400 text-3xl text-center'>Este Produto já está cadastrado!</h1>
      <div className='flex w-full justify-center items-center py-14'>
        <img className='h-48' src={banana} alt="banana aviso" />
        <ExclamationTriangleIcon className='h-24 text-yellow-400 animate-bounce' />
      </div>
    </>
  )
}

export default ProductAlredyRegistered;
