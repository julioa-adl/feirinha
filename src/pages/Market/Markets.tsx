import { useContext, useState } from "react";
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
import { useQuery } from "react-query";
import { fetchMarkets } from "../../helpers/httpClient/marketsClient";

const Markets = () => {
  
  const {
    showMarket,
  } = useContext(context);
  
  const { data, isLoading } = useQuery('markets', () => fetchMarkets(), {retry: 10});
  const sortMarketState = data && data.sort(function(a,b) {
    return a.state < b.state ? -1 : a.state > b.state ? 1 : 0;
  });
  const [mySearch, setMySearch] = useState(sortMarketState)

  return(
    <div className="bg-white h-screen dark:bg-gray-900">
      <div className='fixed top-0 z-30 md:relative bg-white dark:bg-gray-900 p-5 flex items-center w-full justify-center'>
        <Navigator />
        <Search arrayToSearch={sortMarketState} typeUse='mercados' setResultSearchState={setMySearch}/>
        <User />
      </div>
      <ul className='w-screem full pt-20 pb-36 md:py-0 lg:h-4/5 px-5 overflow-auto flex flex-col items-center gap-2 drop-shadow-lg'>
        { 
          !isLoading && sortMarketState ? (
            !mySearch ? (sortMarketState.map((mrkt:Imarket) => (
              <MarketCard key={ `market-item-list-${mrkt._id}` } mrkt={mrkt} />
            ))) : mySearch.length > 0 ? (mySearch.map((mrkt:Imarket) => (
              <MarketCard key={ `market-item-list-${mrkt._id}` } mrkt={mrkt} />
            ))) : <NotFind />
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
