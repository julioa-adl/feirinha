import { Link, useLocation } from "react-router-dom"
import logo from '../assets/feirinha-icon.png';
import { ArchiveBoxIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';

const MobileMenu = () => {
  const { pathname } = useLocation()

  return (
    <>
    <div className='fixed bottom-0 h-16 bg-gray-100 dark:bg-gray-800 w-full flex lg:hidden justify-start md:justify-between items-center p-2 md:px-12 md:py-4'>

        <div className='justify-between items-center mx-8 flex gap-8 w-full'>
          <Link
            to='/mercados'
            className={`flex flex-col items-center hover:text-yellow-500 dark:hover:text-blue-400 ${pathname === '/mercados' ? 'text-bold text-yellow-500 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}
          ><BuildingStorefrontIcon className="h-6"/>
          {
            pathname === '/mercados' && <div className="bg-yellow-500 dark:bg-blue-400 w-6 h-0.5"/>
          }</Link>
          <Link to='/' className="relative flex flex-col items-center">
            <img
              className='h-10 dark:invert'
              src={ logo }
              alt="logo"
            />
            {
            pathname === '/' && <div className="absolute bottom-0 bg-yellow-500 dark:bg-blue-400 w-6 h-0.5"/>
            }
          </Link>

          <Link
            to='/produtos'
            className={`flex flex-col items-center hover:text-yellow-500 dark:hover:text-blue-400 ${pathname === '/produtos' ? 'text-bold text-yellow-500 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}
          ><ArchiveBoxIcon className="h-6"/>
          {
            pathname === '/produtos' && <div className="bg-yellow-500 dark:bg-blue-400 w-6 h-0.5"/>
          }</Link>
        </div>
      </div>
    </>
  )
}

export default MobileMenu;
