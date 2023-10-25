import { ChangeEvent, useEffect, useState } from "react";
// import context from '../context/myContext';
import categories from "../helpers/categories";
import unidadeDeMedida from "../helpers/unidadeDeMedida";
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { registerProduct, updateProduct } from "../helpers/httpClient";
import { ApiResponse } from '../interfaces/ApiResponse';
import RegisteredSuccess from "../components/alerts/RegisteredSuccess";
import Loading from '../components/Loading';
import EditedSuccess from "../components/alerts/EditedSuccess";
import Error from "../components/alerts/Error";
import { Iprod } from "../helpers/httpClient";

interface ProductFormProps {
  code: string,
  typeUse: string | undefined,
  product: Iprod
}

const ProductForm = ({ product, code, typeUse }: ProductFormProps) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [registered, setregistered] = useState<boolean>(false);
  const [addProd, setAddProd] = useState({
    id: product['_id'] || '',
    name: product.name || '',
    subName: product.subName || '',
    manufacturer: product.manufacturer || '',
    category: product.category || '',
    code: product.code || code,
    unitMeasure: product.unitMeasure,
    size: product.size || 0
  })

  const returnForm = {
    Cadastrar: <RegisteredSuccess />,
    Atualizar: <EditedSuccess />,
    Erro: <Error />
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setAddProd((prevstate) => ({
      ...prevstate,
      [id]: value,
    }));
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

  useEffect(() => {
    const {name, manufacturer, category, code, unitMeasure, size} = addProd;
    if (size <= 0 && !unitMeasure) { return }
    if (
      name.length > 0 &&
      manufacturer.length > 0 &&
      category.length > 0 &&
      code.length > 0 ) {
      return setDisable(false);
    }
    return setDisable(true);
  }, [addProd])

  const handleRegistered = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    const res = await registerProduct(addProd);
    console.log(res);
    setLoading(false);
    if (!(res as ApiResponse).status) {
      setError((res as ApiResponse).response.data.message)
    }
    setregistered(true)
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateProduct(addProd);
    setLoading(false);
    if (!(res as ApiResponse).status) {
      setError((res as ApiResponse).response.data.message)
    }
    setregistered(true)
  };

  return (
    <>
    {
      registered ? (
        returnForm[error ? 'Erro' : typeUse]
      ) : (
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor=""
              className="text-gray-100 flex justify-between"
            >nome do produto: <span className="text-gray-600 text-sm">obrigatório</span></label>
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
              className="text-gray-100 flex justify-between"
            >fabricante: <span className="text-gray-600 text-sm">obrigatório</span></label>
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
              className="text-gray-100 flex justify-between"
            >Categoria: <span className="text-gray-600 text-sm">obrigatório</span></label>
            <select
              required
              id='category'
              name='category'
              value={ addProd.category }
              onChange={ handleChange }
              className="px-4 py-1 w-full rounded-md"
            >
              <option value="" disabled>Selecione uma Categoria</option>
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
              className="text-gray-100 flex justify-between"
            >Código de Barras: <span className="text-gray-600 text-sm">obrigatório</span></label>
            <input
              type="text"
              required
              id='code'
              value={ addProd.code || code }
              onChange={ handleChange }
              placeholder="000000"
              className="px-4 py-1 w-full rounded-md"
            />
            <p className="text-gray-600 text-sm">confira com atenção o código capturado, caso necessário corrija o código!</p>
          </div>

          <h2 className="text-gray-100">Dimenssões</h2>
          <hr />

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
                >métrica: </label>
                <select
                  id='unitMeasure'
                  name='unitMeasure'
                  value={ addProd.unitMeasure }
                  onChange={ handleChange }
                  className="px-4 py-1 rounded-md"
                >
                  <option value="" disabled></option>
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

          <button
              type="submit"
              disabled={ disable }
              className={`flex justify-center text-center items-center font-medium
              rounded-full text-sm px-3 py-2 w-full text-white
              ${ disable ? 'bg-blue-400 opacity-50'
              : 'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-1 dark:bg-blue-600 dark:hover:bg-blue-700'}`}
              onClick={ typeUse === 'Cadastrar' ? ( handleRegistered ) : ( handleUpdate ) }
            >
              { loading ? <Loading loading /> : typeUse }
            </button>
        </form>
      )
    }
    </>
  )
}

export default ProductForm;
