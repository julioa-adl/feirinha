import cerejas from '../../assets/cerejas.png';

const NotFindFeirinhas = () => {
  return (
    <>
      <div className='flex w-full justify-center py-14'>
        <img className='h-48' src={cerejas} alt="sacola Feliz aviso" />
      </div>
      <h1 className='text-gray-800 dark:text-yellow-500 text-xl text-center font-thin'>Vamos iniciar sua feirinha?</h1>
      <p className='text-gray-800 dark:text-yellow-500 text-lg text-center'>Toque no botão + para começar</p>
    </>
  )
}

export default NotFindFeirinhas;
