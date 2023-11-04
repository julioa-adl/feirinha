import logo from '../assets/feirinha-icon.png';
import { Link } from 'react-router-dom';
import User from './User';
import Search from './Search';

const Navigator = ({searching}) => {
  return(
    <div className='flex relative'>
      <div className='flex justify-start md:justify-between items-center w-full md:w-2/3 p-4 md:px-12 md:py-4'>
        <Link to='/'>
          <img
            className='h-12 dark:invert'
            src={ logo }
            alt="logo"
          />
        </Link>

        <div className='justify-between absolute -bottom-4 left-0 right-0 mx-8 md:relative md:bottom-0 flex gap-8'>
          <Link
            to='/mercados'
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

        <Search searching={searching}/>

      </div>
      <User />
    </div>
  )
}

export default Navigator;
