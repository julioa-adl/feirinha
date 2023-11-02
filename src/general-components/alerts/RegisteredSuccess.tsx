import pera from '../../assets/pera.png';
import { SparklesIcon } from '@heroicons/react/24/outline';

const RegisteredSuccess = () => {
  return (
    <>
      <h1 className='text-green-500 text-6xl text-center font-thin'>UHUUL!</h1>
      <p className='text-green-500 text-xl text-center'>Cadastrado feito com sucesso</p>
      <div className='flex w-full justify-center py-14'>
        <img className='h-48 animate-bounce' src={pera} alt="banana aviso" />
        <SparklesIcon className='h-10 text-green-400 animate-ping' />
      </div>
    </>
  )
}

export default RegisteredSuccess;
