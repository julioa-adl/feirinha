import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

function ToggleTheme() {
  const pageClasses = document.documentElement.classList;

  const toggle = () => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme !== null) {
      if (JSON.parse(localTheme) === 'dark') {
        localStorage.setItem('theme', JSON.stringify('light'));
        pageClasses.remove('dark');
      } else {
        localStorage.setItem('theme', JSON.stringify('dark'));
        pageClasses.add('dark');
      }
    }
  };

  return (
    <>
      <div
        className='group flex w-10 h-10 lg:w-36 lg:gap-2 items-center justify-center bg-gray-100 rounded-full lg:py-2 lg:px-4 cursor-pointer dark:hidden'
        onClick={ toggle }
      >
        <h1 className='hidden lg:block text-gray-900 text-xs'>Modo Escuro</h1>
        <MoonIcon
          className="h-5 text-gray-900 ease-in-out duration-300 group-hover:text-yellow-400"
        />
      </div>
      <div
        className='group hidden w-10 h-10 lg:w-36 lg:gap-2 items-center justify-center bg-gray-700 rounded-full lg:py-2 lg:px-4 cursor-pointer dark:flex'
        onClick={ toggle }
      >
        <h1 className='hidden lg:block text-gray-100 text-xs'>Modo Claro</h1>
        <SunIcon
          className="h-5 text-gray-100 ease-in-out duration-300 group-hover:text-yellow-400"
        />
      </div>
    </>
  );
}

export default ToggleTheme;
