import pera from '../../assets/pera.png';
import { CakeIcon, SparklesIcon } from '@heroicons/react/24/outline';

const RegisteredSuccess = () => {
  return (
    <>
      <h1 className='text-green-400 text-3xl text-center'>Produto cadastrado com sucesso!</h1>
      <div className='flex w-full justify-center py-14'>
        <img className='h-48 animate-bounce' src={pera} alt="banana aviso" />
        <SparklesIcon className='h-10 text-green-400 animate-ping' />
      </div>
    </>
  )
}

export default RegisteredSuccess;
