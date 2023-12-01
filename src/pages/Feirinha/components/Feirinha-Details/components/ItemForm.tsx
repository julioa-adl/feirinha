import { useState, useEffect, useContext } from "react";
import { IlistCart } from '../../../../../interfaces/IFeirinha';
import Loading from "../../../../../general-components/Loading";
import { registerItem } from '../../../../../helpers/httpClient/cartClient';
import Error from "../../../../../general-components/alerts/Error";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import SelectGeneral from "../../../../../general-components/SelectGeneralTrue";
import context from "../../../../../context/myContext";
import BarCodeScanner from "../../../../../general-components/scanner/BarCodeScanner";
import { fetchProducts } from "../../../../../helpers/httpClient/productClient";

type usageType = 'Cadastrar' | 'Atualizar';

interface MarketFormProps {
  typeUse: usageType,
  feirinhaId: string,
  prodAlredyRegister?: any,
}

type FormType = {
  Erro: JSX.Element;
};

const ItemForm = ({ feirinhaId, typeUse, prodAlredyRegister }: MarketFormProps) => {
  const [notFind, setNotFind] = useState(false);
  const [code, setCode] = useState('');
  const [disable, setDisable] = useState(true);
  const [selectedProd, setSelectedProd] = useState();
  const [addItem, setItem] = useState<IlistCart>({
    productId: prodAlredyRegister ? prodAlredyRegister.productId : '',
    productName: prodAlredyRegister ? prodAlredyRegister.productName : '',
    quantity: 0,
    price: 0,
    buyed: false,
  });

  const {
    setShowItem,
    setRegisterNewProdInAddItemToCart,
    setCodeScanner
  } = useContext(context);

  useEffect(() => {
    if (notFind) {
      return setCodeScanner(code);
    }
    return setCodeScanner()
  }, [notFind])

  useEffect(() => {
    if (selectedProd) {
      const { _id, name } = selectedProd;
      setItem((prev) => ({
        ...prev,
        productId: _id,
        productName: name
      }))
    }
  }, [selectedProd])

  useEffect(() => {
    // disable button logic
    const {productId, productName} = addItem
    if (productId.length > 0 && productName.length > 0) {
      return setDisable(false);
    }
    return setDisable(true);
  }, [addItem])

  const { data } = useQuery('products', () => fetchProducts(), {retry: 10});
  const productsSort = data && data.sort((a,b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  });

  const querieClient = useQueryClient();
  const { mutate: registItem, isLoading: registerLoading, isSuccess: registerSucess, isError: registerError } = useMutation(() => registerItem(feirinhaId, addItem).then(
    () => querieClient.invalidateQueries('feirinhas')
  ))
  const handleRegistered = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    registItem();
  };

  useEffect(() => {
    prodAlredyRegister && registItem();
  }, [prodAlredyRegister])
  
  useEffect(() => {
    if (registerSucess) {
      setShowItem(false);
    }
  }, [registerSucess, setShowItem])
  
  const returnForm: FormType = {
    Erro: <Error />
  }

  return(
    <div>
      {
      (registerError) ? (
        returnForm[(registerError) ? 'Erro' : typeUse]
      ) : (
      <form className="flex flex-col gap-1">

        { typeUse === 'Cadastrar' && (
          <div className="flex justify-between items-end gap-2">
            <div className="flex flex-col w-full">
              <label
                className="text-gray-100 flex justify-between items-end text-sm"
              >produto: <span className="text-gray-600 text-xs">obrigatório</span></label>
              <SelectGeneral
                img='image'
                title={['name', 'subName']}
                subTitle={['manufacturer', 'size', 'unitMeasure']}
                arrayToSelect={productsSort}
                setNotFind={setNotFind}
                selected={code}
                setMyState={setSelectedProd}
              />
            </div>

            <PlusSmallIcon
              className={`h-8 ease-in-out rounded-md duration-300 cursor-pointer ${notFind && 'animate-pulse'} bg-yellow-500 hover:bg-gray-100 text-gray-800 hover:text-yellow-500`}
              onClick={() => setRegisterNewProdInAddItemToCart(true)}
            />
          </div>
          )
        }
        <p className="text-red-400 h-4 w-full text-center text-xs animate-pulse">{`${notFind ? 'produto não encontrado' : ''}`}</p>
        <BarCodeScanner mySetCode={setCode} title={false}/>
        <button
          type="submit"
          disabled={ disable }
          className={`flex justify-center text-center items-center font-medium
          rounded-full text-sm px-3 py-2 w-full text-white mt-3
          ${ disable ? 'bg-blue-400 opacity-50'
          : 'bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-1 dark:bg-blue-600 dark:hover:bg-blue-700'}`}
          onClick={ handleRegistered }
        >
          { registerLoading ? <Loading loading /> : typeUse }
        </button>
      </form>
      )
    }
    </div>
  )
}

export default ItemForm;
