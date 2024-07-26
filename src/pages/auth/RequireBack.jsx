import { Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

const RequireBack = () => {
  const cookie = new Cookies()
  const token = cookie.get('userInfo')
  return  token ? window.history.back() : <Outlet/>
}

export default RequireBack;
