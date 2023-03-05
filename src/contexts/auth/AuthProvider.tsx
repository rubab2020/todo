import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({children}: {children: JSX.Element}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const api = useApi();

    useEffect(() => {
        validateToken();
    }, []);

    const validateToken = async () => {
        const storageData = localStorage.getItem('accessToken');
        if (storageData) {
            const data = await api.validateToken(storageData);
            if (data?.user) {
                setUser(data?.user);
            }
        }
        setLoading(false);
    }

    const login = async (email: string, password: string) => {
        const data = await api.login(email, password);
        if (data?.user && data?.token) {
            setUser(data?.user);
            setToken(data?.token);
            return true;
        }
        return false;
    }

    const logout = async () => {
        setUser(null);
        setToken('');
        await api.logout();
    }

    const setToken = (token: string) => {
        localStorage.setItem('accessToken', token);
    }

    return (
        <AuthContext.Provider value={{loading, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
 
export default AuthProvider;