import { useContext } from "react";
import context from "../../context/myContext";
import MobileMenu from "../../general-components/MobileMenu";
import Navigator from "../../general-components/Navigator";
// import Search from "../../general-components/Search";
import User from "../../general-components/User";
import SkeletonCard from "../../general-components/SkeletonCard";
import { Link } from "react-router-dom";
import { Ifeirinha } from "../../interfaces/IFeirinha";
import FeirinhaCard from "./components/FeirinhaCard";
import CallFeirinhaButton from "./components/CallFeirinhaButton";
import NotFind from "../../general-components/alerts/NotFind";
import AddFeirinha from "./components/AddFeirinha";
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import EditFeirinha from "./components/EditFeirinha";

const Home = () => {
  const {
    feirinhas,
    showFeirinha
  } = useContext(context);

  const { data, isLoading } = feirinhas;

  return(
    <div className="bg-white h-screen dark:bg-gray-900">
      <div className='p-5 flex items-center gap-1 w-full justify-center'>
        <Navigator />
        {/* <Search searching={'feirinha'}/> */}
        <h1 className="rounded-full flex items-start md:justify-center gap-1 max-w-xs text-sm px-4 py-2 w-full bg-gray-100 dark:bg-gray-800 font-bold text-gray-900 dark:text-white">
          <ShoppingBagIcon className="h-4" />
          Minhas Feirinhas
        </h1>
        <User />
      </div>
      <ul className='w-screem h-4/6 lg:h-4/5 px-5 overflow-auto flex flex-col items-center gap-5 drop-shadow-lg'>
        { !isLoading ? (
            data.length > 0 ? data.map((feira:Ifeirinha) => (
              <FeirinhaCard key={ `market-item-list-${feira._id}`} feirinha={feira}/>
            )) : <NotFind />
          ) : <SkeletonCard type={'feirinha'}/>
        }
      </ul>
      {
        showFeirinha  && (
          showFeirinha === 'register' ? (
            <AddFeirinha />
          ) : (
            <EditFeirinha />
          )
        )
      }
      <CallFeirinhaButton />
      <MobileMenu />
    </div>
  )
}

export default Home;
