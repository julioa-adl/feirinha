import { useContext } from 'react';
import context from '../../../context/myContext';
import { PlusIcon } from '@heroicons/react/24/outline';

const CallFeirinhaButton = () => {
  const {
    setShowFeirinha,
  } = useContext(context);

  return(
    <div className='rounded-xl flex flex-col justify-center items-center w-full h-16 md:h-20 p-2 bg-yellow-400 dark:bg-gray-800
    ease-in-out duration-300 hover:bg-yellow-500 dark:hover:bg-yellow-600
    hover:text-gray-900 dark:hover:text-gray-100
    cursor-pointer text-gray-500 dark:text-gray-100'
    onClick={() => setShowFeirinha('register')}
    >
      {/* <p>Nova Feirinha</p> */}
      <PlusIcon className='h-6'
      />
    </div>
  )
}

export default CallFeirinhaButton;
