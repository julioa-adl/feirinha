import { useContext, useState, useEffect } from "react";
import context from '../context/myContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Scanner from '../components/scanner/Scanner';

import ProductForm from "../components/ProductForm";
import ProductAlredyRegistered from "../components/errors/ProductAlredyRegistered";


const AddProduct = () => {
  const [code, setCode] = useState('');
  const [isProductRegistered, setIsproductRegistered] = useState<boolean | React.ReactNode>(false);

  const {
    setShowAdd,
    showAdd,
    products
  } = useContext(context);

  const handleDetected = result => {
    if (result) {
      setCode(result.codeResult.code);
    }
  };


  useEffect(() => {
    const error = <ProductAlredyRegistered />
    const proceed = <ProductForm code={code}/>
    if (code && products) {
      const verify = products.some((prod) => prod.code === code)
      if (verify) {
        return setIsproductRegistered(error);
      } else {
        return setIsproductRegistered(proceed);
      }
    }
  }, [code, products])

  return(
    <div className="fixed top-0 z-10 h-full w-full bg-opacity-70
    bg-gray-900 flex flex-col items-center justify-center">
      <div className="flex flex-col w-80 md:w-1/3 p-5 bg-gray-800 rounded-xl
      ease-in-out origin-bottom transition-transform">
        <XMarkIcon
          className="h-6 cursor-pointer text-gray-100 hover:text-red-500
          duration-300 ease-in-out hover:scale-125 self-end"
          onClick={() => setShowAdd(!showAdd)}/>
        {
          !code ? (
            <div className="flex flex-col gap-10 ">
              <h1 className="text-gray-100">Scanner de código de barras</h1>
              <Scanner onDetected={handleDetected} />
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