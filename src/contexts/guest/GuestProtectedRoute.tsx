import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const GuestProtectedRoute = ({children}: {children: JSX.Element}) => {
    const auth = useContext(AuthContext);
    
    if (!auth.loading && auth?.user) {
        return <Navigate to="/todos" />
    }

    return children;
}
 
export default GuestProtectedRoute;