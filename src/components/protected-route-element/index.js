import { Navigate } from "react-router-dom";

export function ProtectedRouteElement({element, auth, to}){

  return auth ? element : <Navigate to={to} replace/>
}
