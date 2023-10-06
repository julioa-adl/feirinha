import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/feirinha-logo.png";
import Loading from '../components/Loading';
import ToggleTheme from "../components/ToggleTheame";
import { UserIcon, LockClosedIcon, EnvelopeIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';
import { registUser } from '../helpers/httpClient';
import { ApiResponse } from '../interfaces/ApiResponse';

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

  const history = useNavigate();

  const loginHere = () => {
    history('/login');
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    const res = await registUser(values);
    console.log(res);
    setLoading(false);
    if (!(res as ApiResponse).status) {
      setError((res as ApiResponse).response.data.message)
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  useEffect(() => {
    const emailIsValid = values.email.match(/^[A-Za-z0-9_!#$%&'*+\\/=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[a-zA-Z0-9_.+-]+$/gm);
    if (
      values.email.length > 0 &&
      emailIsValid &&
      values.password.length > 5 &&
      values.name.length > 0 &&
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
    <div className= "h-screen w-screen bg-blue-400 bg-market dark:bg-gray-900 dark:bg-market-75 m-auto flex flex-col justify-evenly items-center">
      <form className="relative flex flex-col gap-6 items-center">
        <img src={logo} alt='logo' className="w-36 dark:invert"/>
        <div className="relative">
          <UserIcon className="h-5 absolute text-gray-800 top-2.5 left-3"/>
          <input
            type="text"
            required
            id='name'
            value={ values.name }
            onChange={ handleChange }
            placeholder="Digite seu nome"
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
            placeholder="Digite sua senha"
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
            className={`rounded-full px-8 py-2 w-80 text-center dark:bg-gray-600 dark:text-gray-100`}/>
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
          error && <span className='absolute top-44 h-4 text-gray-900 dark:text-red-500'>{ error }</span>
        }
        <button
          type="submit"
          disabled={ disable }
          className={`flex justify-center text-center items-center font-medium rounded-full text-sm px-3 py-2 w-80 text-white ${ disable ? 'bg-gray-800 opacity-75' : 'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-1 dark:bg-blue-600 dark:hover:bg-blue-700'}`}
          onClick={ handleSubmit }
        >
          { loading ? <Loading loading /> : 'Criar' }
        </button>
        <div className='-mt-5 text-sm dark:text-gray-100'>
          <span>Já possui uma conta?</span><span className="font-bold cursor-pointer text-gray-100 hover:text-gray-900 dark:text-blue-400 dark:hover:text-blue-600" onClick={ loginHere }> Entre aqui!</span>
        </div>
      </form>
      <ToggleTheme />
    </div>
  )
}

export default Register;
