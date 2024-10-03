import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRouteElement({element, auth, loading, checkAuth}){
  const {pathname} = useLocation();
  const url = window.location.href;
  /* useEffect(() => {
    checkAuth()
  }, []); */

  return (auth || loading) ? element : <Navigate to={'/login'} replace state={{path: pathname, url, title: 'destination'}}/>
}
