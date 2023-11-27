import { ChangeEvent, useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Search = ({ arrayToSearch, setResultSearchState, typeUse }) => {
  const [inputSearch, setInputSearch] = useState('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputSearch(value)
  }

  function replaceSpecialChars(str) {
    str = str.replace(/[ÀÁÂÃÄÅ]/g, "A");
    str = str.replace(/[àáâãäå]/g, "a");
    str = str.replace(/[ÈÉÊË]/g, "E");
    str = str.replace(/[èéêë]/g, "e");
    str = str.replace(/[ÌÍÎÏ]/g, "I");
    str = str.replace(/[ìíîï]/g, "i");
    str = str.replace(/[ÒÓÔÕÖØ]/g, "O");
    str = str.replace(/[òóôõöø]/g, "o");
    str = str.replace(/[ÙÚÛÜ]/g, "U");
    str = str.replace(/[ùúûü]/g, "u");
    str = str.replace(/[ÝŸ]/g, "Y");
    str = str.replace(/[ýÿ]/g, "y");
    str = str.replace(/[Ç]/g, "C");
    str = str.replace(/[ç]/g, "c");

    return str.replace(/[^a-z0-9]/gi, '');
}

  const filtrarProduto = (pesquisa) => {
    const termoPesquisa = replaceSpecialChars(pesquisa.toLowerCase());

    const resultados = arrayToSearch && arrayToSearch.filter(produto =>
      Object.values(produto).some(valor =>
      replaceSpecialChars(String(valor).toLowerCase()).includes(termoPesquisa)
    )
  );
  //  if (resultados.length === 0) {
  //     return ['no-result']
  //  }

  return resultados;
  }
  const resultSearch = filtrarProduto(inputSearch)

  useEffect(() => {
    setResultSearchState(resultSearch ? resultSearch : [])
  }, [inputSearch, arrayToSearch])

  return(
    <div className='relative'>
      <MagnifyingGlassIcon
        className='h-4 absolute text-gray-400 top-2.5 left-3'
      />
      <input
        type="search"
        placeholder={`Buscar ${typeUse}`}
        onChange={handleSearch}
        value={inputSearch}
        className='rounded-full text-sm px-4 pl-8 py-2 w-full bg-gray-100 focus:outline-none'
      />
    </div>
  )
}

export default Search;
