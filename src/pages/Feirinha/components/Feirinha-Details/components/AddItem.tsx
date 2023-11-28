import { useContext } from "react";
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import context from "../../../../../context/myContext";
import { XMarkIcon } from '@heroicons/react/24/outline';
import ItemForm from "./ItemForm";
import ProductForm from "../../../../Product/components/ProductForm";

const AddItem = ({feirinhaId}) => {

  const {
    setShowItem,
    registerNewProdInAddItemToCart,
    setRegisterNewProdInAddItemToCart
  } = useContext(context);

  return(
    <div className="fixed top-0 z-40 h-full w-full bg-opacity-70
    bg-gray-900 flex flex-col items-center justify-center">
      <div className="flex flex-col w-80 md:w-1/3 p-5 bg-gray-800 rounded-xl
      ease-in-out origin-bottom transition-transform">
        <div className="flex w-full justify-between items-center mb-4">
          <h1 className="text-yellow-500 w-full font-bold flex items-center"><ShoppingBagIcon className="h-4 mr-1"/>ADICIONAR ITEM</h1>
          <XMarkIcon
            className="h-6 cursor-pointer text-gray-100 hover:text-red-500
            duration-300 ease-in-out hover:scale-125 self-end"
            onClick={() => {
              setShowItem(false)
              setRegisterNewProdInAddItemToCart(false)
            }}/>
        </div>
        {!registerNewProdInAddItemToCart ? (
          <ItemForm typeUse='Cadastrar' feirinhaId={feirinhaId}/>
          ) : (
            <ProductForm typeUse='Cadastrar' feirinha={true}/>
          )
        }
        
        
      </div>
    </div>
  )
}

export default AddItem;