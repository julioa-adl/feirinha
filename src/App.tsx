import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Provider from './context/myProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Products from './pages/Products';

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
          <Route element = { <PrivateRouter /> }>
            <Route path={"/"} element = { <Home /> }/>
            <Route path={"/produtos"} element = { <Products /> }/>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App;
