import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/feirinha-logo.png";
import Loading from '../general-components/Loading';
import ToggleTheme from "../general-components/ToggleTheame";
import { UserIcon, LockClosedIcon, EnvelopeIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';
import { registUser } from '../helpers/httpClient';
import { ApiResponse } from '../interfaces/ApiResponse';
import context from '../context/myContext';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    birthday: '',
  });
  const [terms, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState(false);

  const {
    setToken
  } = useContext(context)

  const history = useNavigate();

  const loginHere = () => {
    history('/login');
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    const res = await registUser(values);
    setLoading(false);
    if (!(res as ApiResponse).status) {
      setError((res as ApiResponse).response.data.message)
      setTimeout(() => {
        setError(false);
      }, 5000);
    } else {
      history('/');
      setToken((res as ApiResponse).data.token)
    }
  };

  useEffect(() => {
    const emailIsValid = values.email.match(/^[A-Za-z0-9_!#$%&'*+\\/=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[a-zA-Z0-9_.+-]+$/gm);
    if (
      values.email.length > 0 &&
      emailIsValid &&
      values.password.length > 5 &&
      values.name.split(' ').length >= 2 && values.name.split(' ')[1] && values.name.split(' ')[1].length >= 3 &&
      values.birthday.length > 0 &&
      terms === true) {
      return setDisable(false);
    }
    return setDisable(true);
  }, [values, terms])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === 'terms') {
      setChecked(!terms)
      return;
    }
    setValues((prevstate) => ({
      ...prevstate,
      [id]: value,
    }));
  }

  return (
    <div className= "h-screen w-screen bg-blue-400 bg-market bg-cover dark:bg-gray-900 dark:bg-market-75 m-auto flex flex-col justify-evenly items-center py-20">
      <form className="relative flex flex-col gap-4 items-center">
        <img src={logo} alt='logo' className="w-20 md:w-36 dark:invert"/>
        <div className="relative">
          <UserIcon className="h-5 absolute text-gray-800 top-2.5 left-3"/>
          <input
            type="text"
            required
            id='name'
            value={ values.name }
            onChange={ handleChange }
            placeholder="Ex. Lucas Lima"
            className={`rounded-full px-8 py-2 w-80 text-center dark:bg-gray-600 dark:text-gray-100`}/>
        </div>
        <div className='relative'>
          <EnvelopeIcon className="h-5 absolute text-gray-800 top-2.5 left-3"/>
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
            type='password'
            required
            id='password'
            value={ values.password }
            onChange={ handleChange }
            placeholder="mínimo 6 caracteres"
            className={`rounded-full px-8 py-2 w-80 text-center dark:bg-gray-600 dark:text-gray-100`}/>
        </div>
        <div className="relative">
          <CalendarDaysIcon className="h-5 absolute text-gray-800 top-2.5 left-3"/>
          <input
            type="date"
            required
            id='birthday'
            value={ values.birthday }
            onChange={ handleChange }
            placeholder='dd/mm/aaaa'
            className={`appearance-none rounded-full px-8 py-2 w-80 text-center h-10 bg-white dark:bg-gray-600 dark:text-gray-100`}/>
        </div>
        <div className='flex flex-row gap-3 items-center w-80 ml-6'>
          <input
            className='h-4 w-4'
            id='terms'
            onChange={ handleChange }
            checked={terms}
            type='checkbox'
            required
          />
          <span className='dark:text-gray-100'>Eu aceito os termos de uso</span>
        </div>
        {
          error && <span className='absolute top-36 text-sm text-gray-900 dark:text-red-500'>{ error }</span>
        }
        <button
          type="submit"
          disabled={ disable }
          className={`flex justify-center text-center items-center font-medium rounded-full text-sm px-3 py-2 w-80 text-white ${ disable ? 'bg-gray-800 opacity-75' : 'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-1 dark:bg-blue-600 dark:hover:bg-blue-700'}`}
          onClick={ handleSubmit }
        >
          { loading ? <Loading loading /> : 'Criar' }
        </button>
        <div className='-mt-4 text-xs dark:text-gray-100'>
          <span>Já possui uma conta?</span><span className="font-bold cursor-pointer text-gray-900 hover:text-gray-100 dark:text-blue-400 dark:hover:text-blue-600" onClick={ loginHere }> Entre aqui!</span>
        </div>
      </form>
      <ToggleTheme />
    </div>
  )
}

export default Register;
