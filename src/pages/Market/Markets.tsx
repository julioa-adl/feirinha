import { useContext } from "react";
import context from "../../context/myContext";
import Navigator from "../../general-components/Navigator";
import AddMarket from "./components/AddMarket";
import EditMarket from "./components/EditMarket";
import NotFind from "../../general-components/alerts/NotFind";
import CallMrktButton from "./components/CallMrktButton";
import MarketCard from "./components/MarketCard";
import { Imarket } from "../../helpers/httpClient";

const Markets = () => {
  const {
    markets,
    showMarket,
    search
  } = useContext(context);

  const filterMarket = markets && markets.filter(marketF => ((`${marketF.name} ${marketF.neighborhood} ${marketF.address} ${marketF.city} ${marketF.state}`).toLowerCase().includes(search.mercado.toLowerCase() || '')))

  return(
    <div className="bg-white h-screen dark:bg-gray-900 overflow-hidden">
      <Navigator searching='mercado'/>
      <ul className='w-screem h-4/5 px-5 overflow-auto flex flex-col my-8 pb-10 items-center gap-5 drop-shadow-lg'>
        { markets ? (
            filterMarket.length > 0 ? filterMarket.map((mrkt:Imarket) => (
              <MarketCard key={ `market-item-list-${mrkt._id}` } mrkt={mrkt} />
            )) : <NotFind />
          ) : <li className='text-gray-900 dark:text-gray-100'>Carregando mercados ...</li>
        }
      </ul>
      {
        showMarket  && (
          showMarket === 'register' ? (
            <AddMarket />
          ) : (
            <EditMarket />
          )
        )
      }
      <CallMrktButton />
    </div>
  )
}

export default Markets;
