import myImages from '../../assets/images';
import { SparklesIcon } from '@heroicons/react/24/outline';

const EditedSuccess = () => {
  return (
    <>
      <h1 className='text-green-500 text-6xl text-center font-thin'>YASS!</h1>
      <p className='text-green-500 text-xl text-center'>Editado com sucesso</p>
      <div className='flex w-full justify-center items-center py-14'>
        <img className='h-48' src={myImages.abacata} alt="banana aviso" />
        <SparklesIcon className='h-24 text-green-400 animate-bounce' />
      </div>
    </>
  )
}

export default EditedSuccess;
