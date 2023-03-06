import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { prepareFormFields } from "../../helpers/form";

const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let form = document.getElementById('loginForm');
        let formData = prepareFormFields(form);
        
        if (formData?.email && formData?.password) {
            const isLoggedIn = await auth.login(formData?.email, formData?.password);
            if (isLoggedIn) {
                navigate('/todos');
            } else {
                alert('Invalid credentials.');
            }
        }
    };

    return (
        <React.Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Login</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit} id="loginForm">
                                    <div className="form-group row mb-2">
                                        <label htmlFor="email_address" className="col-md-4 col-form-label text-end">E-Mail Address</label>
                                        <div className="col-md-6">
                                            <input type="email" id="email_address" className="form-control" name="email" required autoFocus />
                                        </div>
                                    </div>
            
                                    <div className="form-group row mb-2">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-end">Password</label>
                                        <div className="col-md-6">
                                            <input type="password" id="password" className="form-control" name="password" required />
                                        </div>
                                    </div>
            
                                    <div className="form-group row mb-2">
                                        <div className="col-md-6 offset-md-4">
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="remember" /> Remember Me
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-6 offset-md-4">
                                            <button type="submit" className="btn btn-primary">Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
 
export default Login;