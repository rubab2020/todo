import React from "react";
import { useNavigate } from "react-router-dom";
import { prepareFormFields } from "../../helpers/form";
import useApi from "../../hooks/useApi";

const Register = () => {
    const api = useApi();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let form = document.getElementById('registrationForm');
        let formData = prepareFormFields(form);
        
        if (formData?.name && formData?.email && formData?.password) {
            const registered = await api.register(formData?.name, formData?.email, formData?.password);
            if (registered.user) {
                navigate('/login');
            } else {
                alert('Something went wrong! Please try again.');
            }
        }
    };

    return (
        <React.Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Register</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit} id="registrationForm">
                                    <div className="form-group row mb-2">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-end">Name</label>
                                        <div className="col-md-6">
                                            <input type="text" id="name" className="form-control" name="name" required autoFocus />
                                        </div>
                                    </div>
            
                                    <div className="form-group row mb-2">
                                        <label htmlFor="email_address" className="col-md-4 col-form-label text-end">E-Mail Address</label>
                                        <div className="col-md-6">
                                            <input type="text" id="email_address" className="form-control" name="email" required />
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
                                            <button type="submit" className="btn btn-primary">Register</button>
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
 
export default Register;