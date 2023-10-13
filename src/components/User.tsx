import { useContext, useEffect, useState } from "react";
import context from "../context/myContext";
import { UserIcon } from '@heroicons/react/24/solid';
import ToggleTheme from '../components/ToggleTheame';

const User = () => {
  const [nameSplit, setNameSplit] = useState<string[] | boolean>();
  
  const {
    tokenDecode
  } = useContext(context);

  useEffect(() => {
    if (!tokenDecode) {
      return setNameSplit(false)
    }
    const res = tokenDecode.data.name.split(' ');
    setNameSplit(res)
  }, [tokenDecode])

  //I don't so much about context. So I'll let you fix this part :)

  const nameSplit = tokenDecode.data.name.split(' ') || null;


  return(
    <div className="w-full md:w-1/3 px-4 sm:px-12 py-4 flex gap-2 justify-end items-center">
      <div className="hidden sm:block"><ToggleTheme /></div>
      <div className="flex w-12 h-12 border-2 border-gray-900 dark:border-gray-100 justify-center items-center m-0 rounded-full">
        <h1
          className=" text-gray-900 dark:text-gray-100 font-bold"
        >{ nameSplit ? nameSplit[0][0]+nameSplit[1][0] : <UserIcon className="h-5 text-gray-900 dark:text-gray-100" /> }
        </h1>
      </div>
    </div>
  )
}

export default User;
