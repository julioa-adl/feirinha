import { useContext } from "react";
import context from "../../context/myContext";
import MobileMenu from "../../general-components/MobileMenu";
import Navigator from "../../general-components/Navigator";
import User from "../../general-components/User";
import SkeletonFeirinha from "./components/SkeletonCard";
import { Ifeirinha } from "../../interfaces/IFeirinha";
import FeirinhaCard from "./components/FeirinhaCard";
import CallFeirinhaButton from "./components/CallFeirinhaButton";
import AddFeirinha from "./components/AddFeirinha";
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import EditFeirinha from "./components/EditFeirinha";
import { useQuery } from "react-query";
import { fetchFeirinhas } from "../../helpers/httpClient/feirinhaClient";
import NotFindFeirinhas from "./NotFindFeirinhas";

const Home = () => {
  const {
    showFeirinha
  } = useContext(context);

  const { data, isLoading } = useQuery('feirinhas', () => fetchFeirinhas(), {retry: 10});

  return(
    <div className="bg-white h-screen dark:bg-gray-900">
      <div className='fixed top-0 z-30 md:relative bg-white dark:bg-gray-900 p-5 flex items-center gap-1 w-full justify-center'>
        <Navigator />
        <h1 className="rounded-full flex items-start md:justify-center gap-1 max-w-xs text-sm px-4 py-2 w-full bg-gray-100 dark:bg-gray-800 font-bold text-gray-900 dark:text-white">
          <ShoppingBagIcon className="h-4" />
          Minhas Feirinhas
        </h1>
        <User />
      </div>
      <ul className='w-screem full py-20 md:py-0 lg:h-4/5 px-5 overflow-auto flex flex-col items-center gap-2 drop-shadow-lg'>
        { !isLoading ? (
            data.length >= 1 ? data.map((feira:Ifeirinha) => (
              <FeirinhaCard key={ `market-item-list-${feira._id}`} feirinha={feira}/>
            )) : <NotFindFeirinhas />
          ) : <SkeletonFeirinha />
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
