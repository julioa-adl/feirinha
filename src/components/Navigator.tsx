import logo from '../assets/feirinha-icon.png';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import User from './User';

const Navigator = () => {
  return(
    <div className='flex'>
      <div className='md:flex justify-between items-center w-2/3 px-12 py-4'>
        <Link to='/'>
          <img
            className='h-12 dark:invert'
            src={ logo }
            alt="logo"
          />
        </Link>
        <div className='flex justify-between gap-8'>
          <Link
            to='/login'
            className='text-gray-900 hover:text-yellow-500 dark:text-gray-100 dark:hover:text-blue-400'
          >Mercados</Link>
          <Link
            to='/produtos'
            className='text-gray-900 hover:text-yellow-500 dark:text-gray-100 dark:hover:text-blue-400'
          >Produtos</Link>
          <Link
            to='/login'
            className='text-gray-900 hover:text-yellow-500 dark:text-gray-100 dark:hover:text-blue-400'
          >Relatórios</Link>
        </div>
        <div className='relative hidden xl:block'>
          <MagnifyingGlassIcon
            className='h-4 absolute text-gray-400 top-2.5 left-3'
          />
          <input
            type="text"
            placeholder='Busque uma feirinha'
            className='rounded-full text-sm px-4 pl-8 py-2 w-72 bg-gray-100 focus:outline-none'
          />
        </div>
      </div>
      <User />
    </div>
  )
}

export default Navigator;
