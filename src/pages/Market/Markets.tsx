import { useContext } from "react";
import context from "../../context/myContext";
import Navigator from "../../general-components/Navigator";
import AddMarket from "./components/AddMarket";
import EditMarket from "./components/EditMarket";
import NotFind from "../../general-components/alerts/NotFind";
import CallMrktButton from "./components/CallMrktButton";
import MarketCard from "./components/MarketCard";
import { Imarket } from "../../interfaces/IMarket";
import SkeletonCard from "../../general-components/SkeletonCard";
import Search from "../../general-components/Search";
import User from "../../general-components/User";
import MobileMenu from "../../general-components/MobileMenu";

const Markets = () => {
  const {
    markets,
    showMarket,
    search
  } = useContext(context);

  const { data, isLoading } = markets;

  const filterMarket = data && data.filter(marketF => ((`${marketF.name} ${marketF.neighborhood} ${marketF.address} ${marketF.city} ${marketF.state}`).toLowerCase().includes(search.mercado.toLowerCase() || '')))

  return(
    <div className="bg-white h-screen dark:bg-gray-900 overflow-hidden">
      <div className='py-5 flex items-center w-full justify-center'>
        <Navigator />
        <Search searching={'mercado'}/>
        <User />
      </div>
      <ul className='w-screem h-4/6 lg:h-4/5 px-5 overflow-auto flex flex-col items-center gap-5 drop-shadow-lg'>
        { !isLoading ? (
            filterMarket.length > 0 ? filterMarket.map((mrkt:Imarket) => (
              <MarketCard key={ `market-item-list-${mrkt._id}` } mrkt={mrkt} />
            )) : <NotFind />
          ) : <SkeletonCard type={'mercado'}/>
        }
      </ul>
      {
        showMarket  && (
          showMarket === 'register' ? (
            <AddMarket />
          ) : (
            showMarket === 'update' && <EditMarket />
          )
        )
      }
      <CallMrktButton />
      <MobileMenu />
    </div>
  )
}

export default Markets;
