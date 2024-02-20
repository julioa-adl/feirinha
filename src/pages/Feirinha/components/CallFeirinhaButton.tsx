import { useContext } from 'react';
import context from '../../../context/myContext';
import { PlusIcon } from '@heroicons/react/24/outline';

const CallFeirinhaButton = () => {
  const {
    setShowFeirinha,
  } = useContext(context);

  return(
    <div className='rounded-xl flex flex-col justify-center items-center w-full md:w-1/2 h-16 md:h-20 p-2 bg-green-500 dark:bg-green-600
    ease-in-out duration-300 hover:bg-white dark:hover:bg-gray-800
    hover:text-gray-900 dark:hover:text-gray-100
    cursor-pointer text-white dark:text-gray-900'
    onClick={() => setShowFeirinha('register')}
    >
      {/* <p>Nova Feirinha</p> */}
      <PlusIcon className='h-6'
      />
    </div>
  )
}

export default CallFeirinhaButton;
