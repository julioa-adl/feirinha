import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Provider from './context/myProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Feirinha/Home';
import Products from './pages/Product/Products';
import Markets from './pages/Market/Markets';
import FeirinhaDetails from './pages/Feirinha/components/Feirinha-Details/FeirinhaDetails';
import Termos from './pages/Termos/Termos';

import PrivateRouter from './PrivateRouter';

const App = () => {
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const pageClasses = document.documentElement.classList;
  
  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (!localTheme) return localStorage.setItem('theme', JSON.stringify(`${systemPreference && 'dark'}`));
    if (localTheme !== null) {
      if (JSON.parse(localTheme) !== 'dark') {
        pageClasses.remove('dark');
      } else {
        pageClasses.add('dark');
      }
      return
    }
    systemPreference && pageClasses.add('dark');
  }, []);
  
  return (
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route path={"/login"} element = { <Login /> }/>
          <Route path={"/register"} element = { <Register /> }/>
          <Route path={"/termos"} element = { <Termos /> }/>
          <Route element = { <PrivateRouter /> }>
            <Route path={"/"} element = { <Home /> }/>
            <Route path={"/feirinha/:id"} element = { <FeirinhaDetails /> }/>
            <Route path={"/produtos"} element = { <Products /> }/>
            <Route path={"/mercados"} element = { <Markets /> }/>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App;
