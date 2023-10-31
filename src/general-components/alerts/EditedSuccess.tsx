import abacata from '../../assets/abacata.png';
import { SparklesIcon } from '@heroicons/react/24/outline';

const EditedSuccess = () => {
  return (
    <>
      <h1 className='text-green-500 text-6xl text-center font-thin'>YASS!</h1>
      <p className='text-green-500 text-xl text-center'>Produto editado com sucesso</p>
      <div className='flex w-full justify-center items-center py-14'>
        <img className='h-48' src={abacata} alt="banana aviso" />
        <SparklesIcon className='h-24 text-green-400 animate-bounce' />
      </div>
    </>
  )
}

export default EditedSuccess;
