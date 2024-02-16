import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/feirinha-logo.png";
import Loading from '../general-components/Loading';
import ToggleTheme from "../general-components/ToggleTheame";
import { UserIcon, LockClosedIcon, EnvelopeIcon, KeyIcon, InboxArrowDownIcon } from '@heroicons/react/24/solid';
import { registUser, validateEmail } from '../helpers/httpClient/userClient';
import { ApiResponse } from '../interfaces/ApiResponse';
import context from '../context/myContext';
import { useMutation } from 'react-query';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    verificationCode: ''
  });
  const [terms, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [disableVC, setDisableVC] = useState(true);
  const [error, setError] = useState(false);

  const { email } = values;
  const { mutate, isLoading, isError, error: setCodeError } = useMutation(() => validateEmail(email)
  )

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

  const emailIsValid = values.email.match(/^[A-Za-z0-9_!#$%&'*+\\/=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[a-zA-Z0-9_.+-]+$/gm);
  useEffect(() => {
    if (
      values.email.length > 0 &&
      emailIsValid &&
      values.password.length > 5 &&
      values.name.split(' ').length >= 2 && values.name.split(' ')[1] && values.name.split(' ')[1].length >= 3 &&
      values.verificationCode.length === 6 &&
      terms === true) {
      return setDisable(false);
    }
    return setDisable(true);
  }, [values, terms])

  useEffect(() => {
    if (
      values.email.length > 0 &&
      emailIsValid ) {
      return setDisableVC(false);
    }
    return setDisableVC(true);
  }, [values])

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
    <div className= "h-screen w-screen bg-blue-400 bg-market-75 bg-cover dark:bg-gray-900 dark:bg-market-75 m-auto flex flex-col justify-evenly items-center">
      <img src={logo} alt='logo' className="w-20 md:w-36 dark:invert"/>
      <form className="relative flex flex-col items-center gap-1">
        {
          error && <span className='text-xs text-gray-900 dark:text-red-500'>{ error }</span>
        }
        <div className="relative w-80">
          <label
              className="ml-5 text-gray-900 dark:text-gray-100 flex justify-between items-end text-xs"
            >nome: </label>
          <UserIcon className="h-5 absolute text-gray-800 top-7 left-3"/>
          <input
            type="text"
            required
            id='name'
            value={ values.name }
            onChange={ handleChange }
            placeholder="Ex. João Silva"
            className={`rounded-full px-8 w-80 text-center dark:bg-gray-600 dark:text-gray-100`}/>
        </div>
        <div className='relative w-80'>
          <label
              className="ml-5 text-gray-900 dark:text-gray-100 flex justify-between items-end text-xs"
            >email: </label>
          <EnvelopeIcon className="h-5 absolute text-gray-800 top-7 left-3"/>
          <input
            type="email"
            required
            id='email'
            value={ values.email }
            onChange={ handleChange }
            placeholder="Digite seu email"
            className={`${error && 'border-solid border-2 border-red-500'} rounded-full px-8 w-80 text-center dark:bg-gray-600 dark:text-gray-100`}/>
        </div>
        <div className="relative w-80">
          <label
              className="ml-5 text-gray-900 dark:text-gray-100 flex justify-between items-end text-xs"
            >senha: </label>
          <LockClosedIcon className="h-5 absolute text-gray-800 top-7 left-3"/>
          <input
            type='password'
            required
            id='password'
            value={ values.password }
            onChange={ handleChange }
            placeholder="mínimo 6 caracteres"
            className={`rounded-full px-8 w-80 text-center dark:bg-gray-600 dark:text-gray-100`}/>
        </div>
        
        <div className="relative w-80">
          <label
              className="ml-5 text-gray-900 dark:text-gray-100 flex justify-between items-end text-xs"
            >validar email: </label>
          <KeyIcon className="h-5 absolute text-gray-800 top-6 left-3"/>
          <div className='flex justify-between'>
            <input
              type='text'
              required
              id='verificationCode'
              value={ values.verificationCode }
              onChange={ handleChange }
              placeholder="código de validação"
              className={`px-8 rounded-l-full w-5/6 h-10 text-center dark:bg-gray-600 dark:text-gray-100`}/>
              <button
                type="button"
                disabled={ disableVC }
                className={`flex justify-center text-center duration-300 ease-in-out items-center shadow-md shadow-green-800 font-medium rounded-r-full text-xs px-3 py-2 h-10 w-1/6
                          text-white ${ disableVC ? 'bg-gray-800 opacity-75' : 'bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-1 dark:bg-green-600 dark:hover:bg-green-700'}`}
                onClick={ () => mutate() }
              >{ isLoading ? <Loading loading /> : <InboxArrowDownIcon className='h-5'/> }</button>
          </div>
              {
                isError && <p className='text-xs text-center text-red-500'>{`${setCodeError || 'erro'}`}</p>
              }
        </div>
        
        <div className='flex my-4 flex-row gap-3 items-center w-80 ml-6'>
          
          <input
            className='h-4 w-4'
            id='terms'
            onChange={ handleChange }
            checked={terms}
            type='checkbox'
            required
          />
          <span className='dark:text-gray-100 text-sm'>Eu aceito os <Link to={'/termos'} className="font-bold cursor-pointer text-gray-900 hover:text-gray-100 dark:text-blue-400 dark:hover:text-blue-600">termos de uso</Link></span>
        </div>
        
        <button
          type="submit"
          disabled={ disable }
          className={`flex justify-center text-center items-center font-medium rounded-full text-sm px-3 py-2 w-80 text-white ${ disable ? 'bg-gray-800 opacity-75' : 'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-1 dark:bg-blue-600 dark:hover:bg-blue-700'}`}
          onClick={ handleSubmit }
        >
          { loading ? <Loading loading /> : 'Criar' }
        </button>
        <div className='text-xs dark:text-gray-100 w-80 flex justify-center gap-1'>
          <span>Já possui uma conta?</span><span className="font-bold cursor-pointer text-gray-900 hover:text-gray-100 dark:text-blue-400 dark:hover:text-blue-600" onClick={ loginHere }> Entre aqui!</span>
        </div>
      </form>
      <ToggleTheme />
    </div>
  )
}

export default Register;
