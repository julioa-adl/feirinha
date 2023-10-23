import { ChangeEvent, useContext, useState } from "react";
import context from '../context/myContext';
import { XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import categories from "../helpers/categories";
import unidadeDeMedida from "../helpers/unidadeDeMedida";

const AddProduct = () => {
  const [addProd, setAddProd] = useState({
    name: '',
    subName: '',
    manufacturer: '',
    category: '',
    code: '',
    unitMeasure: '',
    size: 0
  })
  const {
    setShowAdd,
    showAdd
  } = useContext(context);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setAddProd((prevstate) => ({
      ...prevstate,
      [id]: value,
    }));
    console.log(addProd[id])
  }

  const incrementSize = () => {
    setAddProd((prevState) => ({
      ...prevState,
      size: Number(prevState.size) + 1,
    }));
  };

  const decrementSize = () => {
    if (addProd.size >= 1) {
      setAddProd((prevState) => ({
        ...prevState,
        size: prevState.size - 1,
      }));
    }
  };

  return(
    <div className="fixed top-0 z-10 h-full w-full bg-opacity-70
    bg-gray-900 flex flex-col items-center justify-center">
      <div className="flex flex-col w-80 md:w-1/3 p-5 bg-gray-800 rounded-xl
      ease-in-out origin-bottom transition-transform">
        <XMarkIcon
          className="h-6 cursor-pointer text-gray-100 hover:text-red-500
          duration-300 ease-in-out hover:scale-125 self-end"
          onClick={() => setShowAdd(!showAdd)}/>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor=""
              className="text-gray-100"
            >nome do produto: </label>
            <input
              type="text"
              required
              id='name'
              value={ addProd.name }
              onChange={ handleChange }
              placeholder="Ex. Manteiga"
              className="px-4 py-1 w-full rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor=""
              className="text-gray-100"
            >outros detalhes: </label>
            <input
              type="text"
              id='subName'
              value={ addProd.subName }
              onChange={ handleChange }
              placeholder="Ex. Sem sal"
              className="px-4 py-1 w-full rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor=""
              className="text-gray-100"
            >fabricante: </label>
            <input
              type="text"
              required
              id='manufacturer'
              value={ addProd.manufacturer }
              onChange={ handleChange }
              placeholder="Ex. Nestlé"
              className="px-4 py-1 w-full rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor=""
              className="text-gray-100"
            >Categoria: </label>
            <select
              required
              id='category'
              name='category'
              value={ addProd.category }
              onChange={ handleChange }
              className="px-4 py-1 w-full rounded-md"
            >
              <option value="" disabled selected>Selecione uma Categoria</option>
              {
                categories.map((category, i) => (
                <option
                  key={`addProd${category.name}-${i}`}
                  value={ category.name }>{ category.name }</option>
                ))
              }
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor=""
              className="text-gray-100"
            >Código de Barras: </label>
            <input
              type="text"
              required
              id='code'
              value={ addProd.code }
              onChange={ handleChange }
              placeholder="000000"
              className="px-4 py-1 w-full rounded-md"
            />
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="flex flex-col gap-1">
              <label
                htmlFor=""
                className="text-gray-100"
              >Qtd: </label>
              <div className="flex">
                <div
                  onClick={ decrementSize }
                  className="group bg-gray-600 cursor-pointer hover:bg-red-300
                  ease-in-out duration-300 flex items-center justify-center p-1
                  rounded-l-sm">
                  <MinusIcon
                    className="text-gray-100 group-hover:text-gray-600 h-3"/>
                </div>
                <input
                  min="0"
                  type="number"
                  id='size'
                  value={ addProd.size }
                  onChange={ handleChange }
                  className=" text-center w-14 outline-none text-sm py-1
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                  [&::-webkit-inner-spin-button]:appearance-none"
                />
                <div
                  onClick={ incrementSize }
                  className="group bg-gray-600 cursor-pointer hover:bg-green-300
                  ease-in-out duration-300  flex items-center justify-center p-1
                  rounded-r-sm">
                  <PlusIcon
                    className="text-gray-100 group-hover:text-gray-600 h-3"/>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
                <label
                  htmlFor=""
                  className="text-gray-100"
                >Metri: </label>
                <select
                  id='unitMeasure'
                  name='unitMeasure'
                  value={ addProd.unitMeasure }
                  onChange={ handleChange }
                  className="px-4 py-1 rounded-md"
                >
                  {
                    unidadeDeMedida.map((category, i) => (
                    <option
                      key={`addProd${category.sigla}-${i}`}
                      value={ category.sigla }>{ category.sigla }</option>
                    ))
                  }
                </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct;