import Navigator from "../general-components/Navigator";

const Home = () => {
  return(
    <div className="bg-white h-screen dark:bg-gray-900">
      <Navigator searching='feirinha'/>
      <h1 className="dark:text-gray-100">Home</h1>
    </div>
  )
}

export default Home;
