import logo from '../assets/feirinha-icon.png';
import { Link, useLocation } from 'react-router-dom';

const Navigator = () => {
  const { pathname } = useLocation()

  return(
    <div className='flex relative'>
      <div className='hidden md:flex justify-start md:justify-between items-center p-2 md:px-12 md:py-4'>
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
            className={`hover:text-yellow-500 dark:hover:text-blue-400 ${pathname === '/mercados' ? 'text-bold text-yellow-500 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}
          >Mercados</Link>

          <Link
            to='/produtos'
            className={`hover:text-yellow-500 dark:hover:text-blue-400 ${pathname === '/produtos' ? 'text-bold text-yellow-500 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}
          >Produtos</Link>

          <Link
            to='/login'
            className={`hover:text-yellow-500 dark:hover:text-blue-400 ${pathname === '/estatisticas' ? 'text-bold text-yellow-500 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}
          >Relatórios</Link>

        </div>
      </div>
    </div>
  )
}

export default Navigator;
