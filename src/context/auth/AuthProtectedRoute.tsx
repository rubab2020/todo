import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const AuthProtectedRoute = ({children}: {children: JSX.Element}) => {
    const auth = useContext(AuthContext);

    if (!auth?.user) {
        return <Navigate to="/login" />
    }

    return children;
}
 
export default AuthProtectedRoute;