import { useContext, useCallback } from "react";
import context from "../context/myContext";
import { UserIcon } from '@heroicons/react/24/solid';
import ToggleTheme from '../components/ToggleTheame';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const { tokenDecode } = useContext(context);
  const history = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('userTokenFeirinha');
    history('/login');
  }, [history]);

  const nameSplit = tokenDecode ? tokenDecode.data.name.split(' ') : null;

  return (
    <div className="w-1/3 px-4 sm:px-12 py-4 flex gap-2 justify-end items-start md:items-center">
      <div className="hidden sm:block"><ToggleTheme /></div>
      <div
        className="flex cursor-pointer w-10 h-10 md:w-12 md:h-12 border-2 border-gray-900 dark:border-gray-100 justify-center items-center m-0 rounded-full"
        onClick={logout}
      >
        <h1 className="text-gray-900 dark:text-gray-100 font-bold">
          {nameSplit ? nameSplit[0][0] + nameSplit[1][0] : <UserIcon className="h-5 text-gray-900 dark:text-gray-100" />}
        </h1>
      </div>
    </div>
  );
}

export default User;
