import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/feirinha-logo.png";
import ToggleTheme from "../components/ToggleTheame";
import Loading from '../components/Loading';
import { EyeIcon, UserIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { loginUser } from '../helpers/httpClient';

const Login = () => {
  const [typePass, setTypePass] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState(false);

  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await loginUser(values);
    if (res.status === 200) {
      history('/')
    }
    setLoading(false);
    if (!res.status) {
      setError(true)
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setValues((prevstate) => ({
      ...prevstate,
      [id]: value,
    }));
  }

  useEffect(() => {
    if (values.email.length > 0 && values.password.length > 5) {
      return setDisable(false);
    }
    return setDisable(true);
  }, [values])

  const toggleLookPass = () => {
    typePass ? setTypePass(false) :  setTypePass(true);
  }

  const createAcount = () => {
    history('/register');
  }
  
  return (
    <div
      className= "h-screen w-screen bg-market dark:bg-gray-900 dark:bg-market-75 m-auto flex flex-col justify-evenly items-center">
      <form className="relative flex flex-col gap-8 items-center">
        <img src={logo} alt='logo' className="w-36 mb-8 dark:invert"/>
        <div className="relative">
          <UserIcon className="h-5 absolute text-gray-800 top-2.5 left-3"/>
          <input
            type="email"
            required
            id='email'
            value={ values.email }
            onChange={ handleChange }
            placeholder="Digite seu email"
            className={`${error && 'border-solid border-2 border-red-500'} rounded-full px-8 py-2 w-80 text-center dark:bg-gray-600 dark:text-gray-100`}/>
        </div>
        <div className="relative">
          <LockClosedIcon className="h-5 absolute text-gray-800 top-2.5 left-3"/>
          <input
            type={ typePass? 'text' : 'password' }
            required
            id='password'
            value={ values.password }
            onChange={ handleChange }
            placeholder="Digite sua senha"
            className={`${error && 'border-solid border-2 border-red-500'} rounded-full px-8 py-2 w-80 text-center dark:bg-gray-600 dark:text-gray-100`}/>
            <EyeIcon
              onClick={toggleLookPass}
              className={`h-5 absolute text-gray-800 top-2.5 right-3 cursor-pointer ${typePass || 'hidden'}`}
            />
            <EyeSlashIcon
              onClick={toggleLookPass}
              className={`h-5 absolute text-gray-800 top-2.5 right-3 cursor-pointer ${typePass && 'hidden'}`}
            />
        </div>
        {
          error && <span className='absolute top-44 h-4 text-gray-900 dark:text-red-500'>Usuário ou Senha incorreto(s)!</span>
        }
        <button
          type="submit"
          disabled={ disable }
          className={`flex justify-center text-center items-center font-medium rounded-full text-sm px-3 py-2 w-80 text-white ${ disable ? 'bg-gray-800 opacity-75' : 'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-1 dark:bg-blue-600 dark:hover:bg-blue-700'}`}
          onClick={ handleSubmit }
        >
          { loading ? <Loading loading /> : 'Entrar' }
        </button>
        <div className='-mt-5 text-sm dark:text-gray-100'>
          <span>Ainda não tem uma conta?</span><span className="font-bold cursor-pointer text-blue-700 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-600" onClick={ createAcount }> Crie aqui.</span>
        </div>
      </form>
      <ToggleTheme />
    </div>
  )
}

export default Login;
