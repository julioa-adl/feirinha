import { useContext } from 'react';
import context from '../../../../../context/myContext';
import { PlusIcon } from '@heroicons/react/24/outline';

const CallItemCart = () => {
  const {
    setShowItem,
  } = useContext(context);

  return(
    <div className='rounded-full p-2 bg-yellow-400 dark:bg-gray-500
    ease-in-out duration-300 hover:bg-yellow-500 dark:hover:bg-yellow-600
    hover:text-gray-900 dark:hover:text-gray-100
    fixed bottom-20 z-10 right-5 cursor-pointer text-gray-500 dark:text-gray-100'
    onClick={() => setShowItem('register')}
    >
      <PlusIcon className='h-6'
      />
    </div>
  )
}

export default CallItemCart;
