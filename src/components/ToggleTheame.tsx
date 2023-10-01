import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';

function ToggleTheme() {
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const pageClasses = document.documentElement.classList;

  useEffect(() => {
    systemPreference && pageClasses.add('dark');
  }, []);
  const toggle = () => {
    pageClasses.toggle('dark');
  };
  return (
    <>
      <div
        className='flex w-36 gap-2 items-center justify-center bg-gray-100 rounded-full py-2 px-4 cursor-pointer dark:hidden'
        onClick={ toggle }
      >
        <h1 className='text-gray-900 text-xs'>Modo Escuro</h1>
        <MoonIcon
          className="h-5 text-gray-900"
        />
      </div>
      <div
        className='hidden w-36 gap-2 items-center justify-center bg-gray-700 rounded-full py-2 px-4 cursor-pointer dark:flex'
        onClick={ toggle }
      >
        <h1 className='text-gray-100 text-xs'>Modo Claro</h1>
        <SunIcon
          className="h-5 text-gray-100"
        />
      </div>
    </>
  );
}

export default ToggleTheme;
