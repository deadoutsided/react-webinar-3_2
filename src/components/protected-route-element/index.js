import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRouteElement({element, auth}){
  const {pathname} = useLocation();
  const url = window.location.href;

  return auth ? element : <Navigate to={'/login'} replace/>
}
