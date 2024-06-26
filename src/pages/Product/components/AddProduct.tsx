import { useContext, useState, useEffect } from "react";
import context from '../../../context/myContext';
import { XMarkIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { Iprod } from "../../../interfaces/IProduct";
import ProductForm from "./ProductForm";
import AlredyRegistered from "../../../general-components/alerts/AlredyRegistered";
import BarCodeScanner from "../../../general-components/scanner/BarCodeScanner";
import { useQuery } from "react-query";
import { fetchProducts } from "../../../helpers/httpClient/productClient";

const AddProduct = () => {
  const [isProductRegistered, setIsproductRegistered] = useState<boolean | React.ReactNode>(false);
  const [code, setCode] = useState('')

  const {
    setShowProd,
  } = useContext(context);
  
  const { data } = useQuery('products', () => fetchProducts());

  useEffect(() => {
    const error = <AlredyRegistered />
    const proceed = <ProductForm typeUse='Cadastrar' code={code}/>
    if (code && data) {
      const verify = data.some((prod:Iprod) => prod.code === code)
      if (verify) {
        return setIsproductRegistered(error);
      } else {
        return setIsproductRegistered(proceed);
      }
    }
  }, [code])

  return(
    <div className="fixed top-0 z-40 h-full w-full bg-opacity-70
    bg-gray-900 flex flex-col items-center justify-center">
      <div className="flex flex-col w-80 md:w-1/3 p-5 bg-gray-800 rounded-xl
      ease-in-out origin-bottom transition-transform">
        <XMarkIcon
          className="h-6 cursor-pointer text-gray-100 hover:text-red-500
          duration-300 ease-in-out hover:scale-125 self-end"
          onClick={() => {
            setShowProd(false);
            setCode('');
          }}/>
          
        {
          !code ? (
            <BarCodeScanner title={true} mySetCode={setCode} />
          ) : (
              isProductRegistered && isProductRegistered
          )
        }
        
        {!code &&
          <p className="flex gap-1 my-5 justify-center items-center text-gray-500 w-full text-xs px-4 py-2 bg-gray-700 cursor-pointer rounded-md hover:bg-blue-600 hover:text-white ease-in-out duration-300"
            onClick={() => setCode('0')}
          >preencher manualmente<CodeBracketIcon className="h-4"/></p>
        }
      </div>
    </div>
  )
}

export default AddProduct;