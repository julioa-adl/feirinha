import { useState } from 'react';
import logo from "../assets/feirinha-logo.png";
import ToggleTheme from "../components/ToggleTheame";
import { EyeIcon, UserIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/solid';

const Login = () => {
  const [typePass, setTypePass] = useState(false)

  const toggleLookPass = () => {
    typePass ? setTypePass(false) :  setTypePass(true);
  }
  
  return (
    <div
      className= "h-screen w-96 m-auto flex flex-col justify-evenly items-center">
      <form className="flex flex-col gap-8 items-center mt-24">
        <img src={logo} className="w-36 mb-8 dark:invert"/>
        <div className="relative">
          <UserIcon className="h-5 absolute text-gray-800 top-2.5 left-3"/>
          <input
            type="email"
            placeholder="Digite seu email"
            className="rounded-full px-8 py-2 w-80 text-center"/>
        </div>
        <div className="relative">
          <LockClosedIcon className="h-5 absolute text-gray-800 top-2.5 left-3"/>
          <input
            type={ typePass? 'text' : 'password' }
            placeholder="Digite sua senha"
            className="rounded-full px-8 py-2 w-80 text-center"/>
            <EyeIcon
              onClick={toggleLookPass}
              className={`h-5 absolute text-gray-800 top-2.5 right-3 cursor-pointer ${typePass || 'hidden'}`}
            />
            <EyeSlashIcon
              onClick={toggleLookPass}
              className={`h-5 absolute text-gray-800 top-2.5 right-3 cursor-pointer ${typePass && 'hidden'}`}
            />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-2 w-80 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Entrar</button>
        <div className='-mt-7 text-sm dark:text-gray-100'>
          <span>Ainda não tem uma conta?</span><span className="font-bold"> Crie aqui.</span>
        </div>
      </form>
      <ToggleTheme />
    </div>
  )
}

export default Login;
