import logo from '../assets/feirinha-icon.png';
import { Link } from 'react-router-dom';

const Navigator = () => {
  return(
    <div className='flex relative'>
      <div className='flex justify-start md:justify-between items-center p-2 md:px-12 md:py-4'>
        <Link to='/'>
          <img
            className='h-12 dark:invert'
            src={ logo }
            alt="logo"
          />
        </Link>

        <div className='justify-between hidden mx-8 lg:flex gap-8'>
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
      </div>
    </div>
  )
}

export default Navigator;
