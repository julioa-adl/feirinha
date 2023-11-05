import Navigator from "../general-components/Navigator";
import Search from "../general-components/Search";
import User from "../general-components/User";

const Home = () => {
  return(
    <div className="bg-white h-screen dark:bg-gray-900">
      <div className='flex items-center w-full justify-center'>
        <Navigator />
        <Search searching={'feirinha'}/>
        <User />
      </div>
      <h1 className="dark:text-gray-100">Home</h1>
    </div>
  )
}

export default Home;
