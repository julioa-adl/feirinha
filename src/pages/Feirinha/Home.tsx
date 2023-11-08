import { useContext } from "react";
import context from "../../context/myContext";
import MobileMenu from "../../general-components/MobileMenu";
import Navigator from "../../general-components/Navigator";
import Search from "../../general-components/Search";
import User from "../../general-components/User";
import SkeletonCard from "../../general-components/SkeletonCard";
import { Ifeirinha } from "../../helpers/httpClient";
import FeirinhaCard from "./components/FeirinhaCard";
import CallFeirinhaButton from "./components/CallFeirinhaButton";

const Home = () => {
  const {
    feirinhas,
    // showFeirinha
  } = useContext(context);

  console.log(feirinhas)
  return(
    <div className="bg-white h-screen dark:bg-gray-900">
      <div className='pt-5 flex items-center w-full justify-center'>
        <Navigator />
        <Search searching={'feirinha'}/>
        <User />
      </div>
      <ul className='w-screem h-4/6 lg:h-4/5 px-5 overflow-auto flex flex-col items-center gap-5 drop-shadow-lg'>
        { feirinhas ? (
            feirinhas.map((feira:Ifeirinha) => (
              <FeirinhaCard key={ `market-item-list-${feira._id}`} feirinha={feira}/>
            ))
          ) : <SkeletonCard type={'feirinha'}/>
        }
      </ul>
      {/* {
        showFeirinha  && (
          showFeirinha === 'register' ? (
            <AddMarket />
          ) : (
            <EditMarket />
          )
        )
      } */}
      <CallFeirinhaButton />
      <MobileMenu />
    </div>
  )
}

export default Home;
