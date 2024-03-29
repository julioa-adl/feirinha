import { ChangeEvent, useContext, useEffect, useState } from "react";
import categories from "../../../helpers/categories";
import unidadeDeMedida from "../../../helpers/unidadeDeMedida";
import { PlusIcon, MinusIcon, BellAlertIcon } from '@heroicons/react/24/outline';
import { registerProduct, updateProduct } from '../../../helpers/httpClient/productClient';
import RegisteredSuccess from "../../../general-components/alerts/RegisteredSuccess";
import Loading from '../../../general-components/Loading';
import EditedSuccess from "../../../general-components/alerts/EditedSuccess";
import Error from "../../../general-components/alerts/Error";
import { Iprod } from "../../../interfaces/IProduct";
import { useMutation, useQueryClient } from 'react-query';
import imageCompression from 'browser-image-compression';
import context from "../../../context/myContext";

type usageType = 'Cadastrar' | 'Atualizar';

type FormType = {
  Cadastrar: JSX.Element;
  Atualizar: JSX.Element;
  Erro: JSX.Element;
};

interface ProductFormProps {
  code?: string,
  typeUse: usageType,
  product?: Iprod,
  setRegisterInListCart?: any,
}

const ProductForm = ({ product, code, typeUse, setRegisterInListCart }: ProductFormProps) => {
  const [disable, setDisable] = useState(true);
  const [noCode, setNoCode] = useState(false);
  const [addProd, setAddProd] = useState<Iprod>({
    id: product ? product['_id'] : '',
    name: product ? product.name : '',
    subName: product ? product.subName : '',
    manufacturer: product ? product.manufacturer : '',
    unitSelling: product ? product.unitSelling : '',
    category: product ? product.category : '',
    code: product ? product.code : code ? code : '',
    image: product ? product.image : undefined,
    unitMeasure: product ? product.unitMeasure : '',
    size: product ? product.size : 0,
  });

  const {
    setRegisterNewProdInAddItemToCart
  } = useContext(context);
  
  const handleChange = async (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    const files = (event.target as HTMLInputElement).files;
    
    if (files) {
      const file = files[0];

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 300,
        useWebWorker: true
      }

      const compressedFile = await imageCompression(file, options);
      
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        setAddProd((prevState) => ({
          ...prevState,
          image: dataURL || undefined, // Converta para string ou defina como undefined se dataURL for null
        }));
      };
      reader.readAsDataURL(compressedFile); 
    }
    
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
    if (Number(addProd.size) >= 1) {
      setAddProd((prevState) => ({
        ...prevState,
        size: Number(prevState.size) - 1,
      }));
    }
  };
  
  useEffect(() => {
    const {name, manufacturer, category, code, unitMeasure, size} = addProd;
    if (Number(size) <= 0 && unitMeasure !== '') { return }
    if (
      name? name.length : 0 > 0 &&
      manufacturer? manufacturer.length : 0  > 0 &&
      category? category.length : 0  > 0 &&
      code? code.length : 0  > 0 ) {
        return setDisable(false);
      }
      return setDisable(true);
    }, [addProd])
    
  const querieClient = useQueryClient();
  const { mutate: registerProd, isLoading: registerLoading, isSuccess: registerSucess, isError: registerError } = useMutation(() => registerProduct(addProd).then(
    (data) => {
      const productCart = {productId: data['_id'], productName: data.name}
      if (setRegisterInListCart) {
        setRegisterInListCart(productCart)
      }
      setRegisterNewProdInAddItemToCart(false)
      querieClient.invalidateQueries('products')
    }
  ))
  const handleRegistered = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    registerProd();
  };

  const { mutate: updateProd, isLoading: updateLoading, isSuccess: updateSucess, isError: updateError } = useMutation(() => updateProduct(addProd).then(
    () => querieClient.invalidateQueries('products')
  ))
  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    updateProd();
  };

  const returnForm: FormType = {
    Cadastrar: <RegisteredSuccess />,
    Atualizar: <EditedSuccess />,
    Erro: <Error />
  }

  return (
    <>
    {
      (updateSucess || updateError) || (registerSucess || registerError) ? (
        returnForm[updateError || registerError ? 'Erro' : typeUse]
      ) : (
        <form className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <label
              className="text-gray-100 flex justify-between items-end text-xs"
            >nome do produto: <span className="text-gray-600 text-xs">obrigatório</span></label>
            <input
              type="text"
              autoFocus
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
              className="text-gray-100 text-xs"
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

          <div className="flex w-full justify-between gap-2">
            <div className="flex flex-col gap-1 w-2/6">
                <label
                  className="text-gray-100 text-xs"
                >unid. venda: </label>
                <select
                  id='unitSelling'
                  name='unitSelling'
                  value={ addProd.unitSelling }
                  onChange={ handleChange }
                  className={`px-4 py-1 w-full rounded-md ${addProd.unitSelling === '' ? 'text-gray-400' : 'text-gray-900'}`}
            >
              <option value={''} disabled>-</option>
                  {
                    unidadeDeMedida.map((category, i) => (
                    <option
                      key={`addProd${category.sigla}-${i}`}
                      value={ category.sigla }>{ category.sigla }</option>
                    ))
                  }
                </select>
            </div>

            <div className="flex flex-col gap-1 w-4/6">
              <label
                className="text-gray-100 flex justify-between items-end text-xs"
              >fabricante: <span className="text-gray-600 text-xs">obrigatório</span></label>
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
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="text-gray-100 flex justify-between items-end text-xs"
            >categoria: <span className="text-gray-600 text-xs">obrigatório</span></label>
            <select
              required
              id='category'
              name='category'
              value={ addProd.category }
              onChange={ handleChange }
              className={`px-4 py-1 w-full rounded-md ${addProd.category === '' ? 'text-gray-400' : 'text-gray-900'}`}
            >
              <option value={''} disabled>Selecione uma Categoria</option>
              {
                categories.map((category, i) => (
                <option
                  key={`addProd${category.name}-${i}`}
                  value={ category.name }>{ `${category.icon} ${category.name}` }</option>
                ))
              }
            </select>
          </div>

          <div className="relative flex flex-col gap-1">
            <label htmlFor="code"
              className="text-gray-100 flex justify-between items-end text-xs"
            >código de barras:

              <div className="flex items-center gap-1">
                <input type="checkbox" className="h-3 w-3" onChange={(e) => {
                  const check = e.target.checked;
                  setNoCode(check)
                  setAddProd((prevState) => ({
                    ...prevState,
                    code: check ? 'nocode' : '0'
                  }));
                }}/>
                <span className="text-gray-100 text-xs">no code</span>
              </div>
              
            </label>
            <input
              type="text"
              required
              name="code"
              id='code'
              disabled={noCode}
              value={ addProd.code }
              onChange={ handleChange }
              onFocus={() => {
                if (addProd.code == '0') {
                  setAddProd((prevstate) => ({
                    ...prevstate,
                    code: '',
                  }))
                }
              }}
              onBlur={() => {
                if (addProd.code == '') {
                  setAddProd((prevstate) => ({
                    ...prevstate,
                    code: '0',
                  }))
                }
              }}
              className={`px-4 py-1 w-full rounded-md ${noCode ? 'bg-gray-500 text-gray-500' : 'bg-gray-100'}`}
            />
            <span className="text-gray-300 text-xs">confira com atenção o código capturado, caso necessário corrija o código!</span>
            <div className="absolute top-8 right-2 flex justify-center items-center">
              <BellAlertIcon className="absolute opacity-50 m-auto animate-ping text-gray-500 h-4"/>
              <BellAlertIcon className="text-gray-500 h-4"/>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="text-gray-100 flex justify-between items-end text-xs"
            >imagem: </label>
            <input
              type="file"
              id='image'
              accept="image/*;capture=camera"
              onChange={ handleChange }
              className="text-xs text-gray-600 file:ease-in-out file:duration-300
                        file:py-1 file:px-2 file:border-[1px]
                        file:text-xs file:font-medium file:rounded-sm
                        file:bg-gray-100 file:text-stone-700
                        hover:file:cursor-pointer hover:file:text-blue-700"
            />
          </div>

          <h2 className="text-gray-100 text-xs">DIMENSSÕES</h2>
          <hr />

          <div className="flex justify-start items-center gap-5">
            <div className="flex flex-col gap-1">
              <label
                className="text-gray-100 text-xs"
              >quantidade: </label>
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
                  onFocus={() => {
                    if (addProd.size === 0) {
                      setAddProd((prevstate) => ({
                        ...prevstate,
                        size: '',
                      }))
                    }
                  }}
                  onBlur={() => {
                    if (addProd.size === '') {
                      setAddProd((prevstate) => ({
                        ...prevstate,
                        size: 0,
                      }))
                    }
                  }}
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
                  className="text-gray-100 text-xs"
                >unid. medida: </label>
                <select
                  id='unitMeasure'
                  name='unitMeasure'
                  value={ addProd.unitMeasure }
                  onChange={ handleChange }
                  className={`px-4 py-1 w-full rounded-md ${addProd.unitMeasure === '' ? 'text-gray-400' : 'text-gray-900'}`}
            >
              <option value={''} disabled>-</option>
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
              disabled={ disable || registerLoading }
              className={`flex justify-center text-center items-center font-medium
              rounded-full text-sm px-3 py-2 w-full text-white mt-3
              ${ disable || registerLoading ? 'bg-blue-400 opacity-50'
              : 'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-1 dark:bg-blue-600 dark:hover:bg-blue-700'}`}
              onClick={ typeUse === 'Cadastrar' ? ( handleRegistered ) : ( handleUpdate ) }
            >
              { updateLoading || registerLoading ? <Loading loading /> : typeUse }
            </button>
        </form>
      )
    }
    </>
  )
}

export default ProductForm;
