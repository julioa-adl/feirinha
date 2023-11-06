import MobileMenu from "../../general-components/MobileMenu";
import Navigator from "../../general-components/Navigator";
import Search from "../../general-components/Search";
import User from "../../general-components/User";

const Home = () => {
  return(
    <div className="bg-white h-screen dark:bg-gray-900">
      <div className='pt-5 flex items-center w-full justify-center'>
        <Navigator />
        <Search searching={'feirinha'}/>
        <User />
      </div>
      <h1 className="dark:text-gray-100">Home</h1>
      <MobileMenu />
    </div>
  )
}

export default Home;

// TENTAR FAZER O fetchFeirinhas COM REACT QUERIE SE NAO FAZ NORMAL NO USEREFFECT MESMO