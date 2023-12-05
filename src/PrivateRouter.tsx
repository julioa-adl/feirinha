import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { revalidateToken } from './helpers/httpClient/userClient';

const PrivateRouter = () => {
  const history = useNavigate();

  const auth = async () => {
    const res = await revalidateToken();
    if (!res) return history('/login')
  }

  useEffect(() => {
    auth();
    console.log('testei')
  })
  
  return <Outlet />
}

export default PrivateRouter;
