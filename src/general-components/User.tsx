import { useCallback } from "react";
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import ToggleTheme from './ToggleTheame';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const history = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('userTokenFeirinha');
    history('/login');
  }, [history]);

  return (
    <div className="w-1/3 sm:px-12 flex gap-2 justify-end items-center">
      <div className=""><ToggleTheme /></div>
      <div
        className="group flex cursor-pointer w-10 h-10 md:w-12 md:h-12 bg-gray-100 dark:bg-gray-700 justify-center items-center m-0 rounded-full"
        onClick={logout}
      >
        <ArrowRightOnRectangleIcon
          className="h-5 text-gray-900 dark:text-gray-100 group-hover:text-orange-600 group-dark:hover:text-orange-400 cursor-pointer ease-in-out duration-300"
          />
      </div>
    </div>
  );
}

export default User;
