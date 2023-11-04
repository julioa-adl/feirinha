import { useContext, useState, useEffect } from "react";
import context from '../../../context/myContext';
import { XMarkIcon, ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import Scanner from '../../../general-components/scanner/Scanner';
import { Iprod } from "../../../helpers/httpClient";
import ProductForm from "./ProductForm";
import AlredyRegistered from "../../../general-components/alerts/AlredyRegistered";

interface Result {
  codeResult: {
    code: string;
  };
}

const AddProduct = () => {
  const [code, setCode] = useState('');
  const [isProductRegistered, setIsproductRegistered] = useState<boolean | React.ReactNode>(false);

  const {
    setShowProd,
    products
  } = useContext(context);

  const handleDetected = (result:Result) => {
    if (result) {
      setCode(result.codeResult.code);
    }
  };

  useEffect(() => {
    const error = <AlredyRegistered />
    const proceed = <ProductForm typeUse='Cadastrar' code={code}/>
    if (code && products) {
      const verify = products.some((prod:Iprod) => prod.code === code)
      if (verify) {
        return setIsproductRegistered(error);
      } else {
        return setIsproductRegistered(proceed);
      }
    }
  }, [code])

  return(
    <div className="fixed top-0 z-10 h-full w-full bg-opacity-70
    bg-gray-900 flex flex-col items-center justify-center">
      <div className="flex flex-col w-80 md:w-1/3 p-5 bg-gray-800 rounded-xl
      ease-in-out origin-bottom transition-transform">
        <XMarkIcon
          className="h-6 cursor-pointer text-gray-100 hover:text-red-500
          duration-300 ease-in-out hover:scale-125 self-end"
          onClick={() => { setShowProd(false); setCode('') }}/>
        {
          !code ? (
            <div className="flex flex-col gap-5 relative">
              <div className="flex gap-5 items-center justify-center">
                <ViewfinderCircleIcon className="h-10 text-gray-100"/>
                <span className="text-gray-100">Scanneie o código de barras!</span>
              </div>
              <div className="h-36 md:h-full">
                <Scanner onDetected={handleDetected} />
              </div>
            </div>
          ) : (
              isProductRegistered && isProductRegistered
          )
        }
        
      </div>
    </div>
  )
}

export default AddProduct;