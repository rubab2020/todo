import React, { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth/AuthContext";

const Header = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const guestNavLinks = () => {
        return <React.Fragment>
            <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
            </li>
        </React.Fragment>
    };
    
    const authNavLinks = () => {
        return <React.Fragment>
            <li className="nav-item">
                <Link to="/todos" className="nav-link">Todos</Link>
            </li>
            <li className="nav-item">
                <Link to="/tasks" className="nav-link">Tasks</Link>
            </li>
            <NavDropdown title={auth?.user?.name || 'Mr. X'} id="basic-nav-dropdown">
                <NavDropdown.Item href={void(0)} onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
        </React.Fragment>
    };
    
    const logout = async () => {
        await auth.logout();
        navigate('/login');
    };

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light navbar-todo">
                <div className="container">
                    <Link to="/todos" className="navbar-brand">Todo</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            {!auth.loading && !auth.user ? guestNavLinks() : authNavLinks()}
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
}
 
export default Header;