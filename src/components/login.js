import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from 'axios';

function Signin() {
    const [values, setValues] = useState({
        matricule: '',
        password: ''
    });
    
    const [error, setError] = useState('');

    const navigate = useNavigate();

    axios.defaults.withCredentials = true ;

    const handleLogin = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/login', values)
        .then(res => {
            if(res.data.Status === "Success"){
                navigate('/congee'); 
            }else{
                alert("Error");
            }
        })
        .catch(err => {
            console.log(err);
            setError('Login failed. Please check your credentials.');
        });
    }

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label>Matricul</label>
                    <input
                        type="number"
                        min="1"
                        value={values.matricule}
                        onChange={e => setValues({...values, matricule : e.target.value})}
                        placeholder="matricule"
                        required
                        onInput={(e) => {
                            if (e.target.value.length > 3) {
                                e.target.value = e.target.value.slice(0, 3);
                            }
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        value={values.password}
                        onChange={e => setValues({...values, password : e.target.value})}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="login-button">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Signin;