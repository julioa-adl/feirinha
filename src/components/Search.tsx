import { useContext } from 'react';
import context from '../context/myContext';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface seachComponent {
  searching: string
}

const Search = ({ searching }:seachComponent) => {
  const {
    handleChange,
    search
  } = useContext(context)
  
  return(
    <div className='relative xl:block'>
      <MagnifyingGlassIcon
        className='h-4 absolute text-gray-400 top-2.5 left-3'
      />
      <input
        type="text"
        id={searching}
        placeholder={`Buscar ${searching}`}
        onChange={handleChange}
        value={search[searching]}
        className='rounded-full text-sm px-4 pl-8 py-2 w-full bg-gray-100 focus:outline-none'
      />
    </div>
  )
}

export default Search;
