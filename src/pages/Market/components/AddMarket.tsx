import { useContext, /*useState, useEffect*/ } from "react";
import context from '../../../context/myContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import MarketForm from "./MarketForm";
// import { Imarket } from "../../../helpers/httpClient";
// import AlredyRegistered from "../../../general-components/alerts/AlredyRegistered";
// import MarketForm from "./MarketForm";

const AddMarket = () => {
  // const [isMarketRegistered, setIsMarketRegistered] = useState<boolean | React.ReactNode>(true);

  const {
    setShowMarket,
    // markets
  } = useContext(context);

  // useEffect(() => {
  //   const error = <AlredyRegistered />
  //   const proceed = <MarketForm typeUse='Cadastrar'/>
  //   if (markets) {
  //     const verify = markets.some((market:Imarket) => market.name === code)
  //     if (verify) {
  //       return setIsMarketRegistered(error);
  //     } else {
  //       return setIsMarketRegistered(proceed);
  //     }
  //   }
  // }, [])

  return(
    <div className="fixed top-0 z-10 h-full w-full bg-opacity-70
    bg-gray-900 flex flex-col items-center justify-center">
      <div className="flex flex-col w-80 md:w-1/3 p-5 bg-gray-800 rounded-xl
      ease-in-out origin-bottom transition-transform">
        <XMarkIcon
          className="h-6 cursor-pointer text-gray-100 hover:text-red-500
          duration-300 ease-in-out hover:scale-125 self-end"
          onClick={() => setShowMarket(false)}/>
        {/* {
          isMarketRegistered && isMarketRegistered
        } */}
        <MarketForm typeUse='Cadastrar'/>
      </div>
    </div>
  )
}

export default AddMarket;