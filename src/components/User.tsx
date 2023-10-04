import { useContext } from "react";
import context from "../context/myContext";
import { UserIcon } from '@heroicons/react/24/solid';
import ToggleTheme from '../components/ToggleTheame';

const User = () => {

  const {
    tokenDecode
  } = useContext(context);

  const nameSplit = tokenDecode.data.name.split(' ') || null;

  return(
    <div className="w-1/3 px-12 py-4 flex gap-2 justify-end items-center">
      <ToggleTheme />
      <div className="flex w-12 h-12 border-2 border-gray-900 dark:border-gray-100 justify-center items-center m-0 rounded-full">
        <h1
          className=" text-gray-900 dark:text-gray-100 font-bold"
        >{ nameSplit[0][0]+nameSplit[1][0] || <UserIcon /> }
        </h1>
      </div>
    </div>
  )
}

export default User;
