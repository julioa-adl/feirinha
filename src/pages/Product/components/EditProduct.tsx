import { useContext } from "react";
import context from '../../../context/myContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

import ProductForm from "./ProductForm";

const EditProduct = () => {
  const {
    setShowProd,
    editProd
  } = useContext(context);

  return(
    <div className="fixed top-0 z-20 h-full w-full bg-opacity-70
    bg-gray-900 flex flex-col items-center justify-center">
      <div className="flex flex-col w-80 md:w-1/3 p-5 bg-gray-800 rounded-xl
      ease-in-out origin-bottom transition-transform">
        <XMarkIcon
          className="h-6 cursor-pointer text-gray-100 hover:text-red-500
          duration-300 ease-in-out hover:scale-125 self-end"
          onClick={() => setShowProd(false)}/>
        <ProductForm typeUse='Atualizar' product={editProd} code='0'/>
        
      </div>
    </div>
  )
}

export default EditProduct;