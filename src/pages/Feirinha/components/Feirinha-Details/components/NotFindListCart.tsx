import moranguinho from '../../../../../assets/moranguinho.png';

const NotFindListCart = () => {
  return (
    <>
      <div className='flex w-full justify-center py-14'>
        <img className='h-48' src={moranguinho} alt="moranguinho aviso" />
      </div>
      <h1 className='text-gray-800 dark:text-yellow-500 text-xl text-center font-thin'>Vamos iniciar sua lista?</h1>
      <p className='text-gray-800 dark:text-yellow-500 text-lg text-center'>Toque no botão + para adicionar produtos</p>
    </>
  )
}

export default NotFindListCart;
