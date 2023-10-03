import Navigator from "../components/Navigator";
import ToggleTheme from '../components/ToggleTheame';

const Home = () => {
  return(
    <div className="bg-white h-screen dark:bg-gray-900">
      <Navigator />
      <h1 className="dark:text-gray-100">Home</h1>
      <ToggleTheme />

    </div>
  )
}

export default Home;
