import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import Sidebar from "./components/Dashboard/Sidebar";
import {useSelector,useDispatch} from 'react-redux';


const RequireAuth = ({ allowedRoles,Component }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const userRoles = useSelector((state) => state.authData.roles);

    // const hasRequiredRole = userRoles?.some(role => allowedRoles?.includes(role));


    return (
      userRoles
        ? <Outlet/>
          : <Navigate to="/login" state={{ from: location }} replace />
    );
  }

export default RequireAuth;