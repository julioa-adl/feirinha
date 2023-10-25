import { useContext } from 'react';
import context from '../context/myContext';
import { PlusIcon } from '@heroicons/react/24/outline';

const AddProdButton = () => {
  const {
    setShowProd,
  } = useContext(context);

  return(
    <div className='rounded-full p-2 bg-gray-100 dark:bg-gray-800
    ease-in-out duration-300 hover:bg-yellow-500 dark:hover:bg-yellow-600
    hover:text-gray-900 dark:hover:text-gray-100
    fixed bottom-5 right-5 cursor-pointer text-gray-400'
    onClick={() => setShowProd('register')}
    >
      <PlusIcon className='h-6'
      />
    </div>
  )
}

export default AddProdButton;
