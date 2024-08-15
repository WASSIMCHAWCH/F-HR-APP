import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({
        matricule: '',
        name: '',
        signupDate: '',
        solde: '',
        password: '',
    });

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSignup = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/signup', values)
            .then(res => {
                if(res.data.Status === "Success"){
                    navigate('/login'); 
                }else{
                    alert("Error");
                }
            })
            .catch(err => {
                console.log(err);
                setError('Sign in failed. Please check your credentials.');
            });
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSignup} className="login-form">
                <h2>Sign Up</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label>Matricule</label>
                    <input
                        type="number"
                        min="1"
                        value={values.matricule}
                        onChange={e => setValues({ ...values, matricule: e.target.value })}
                        placeholder="Matricule"
                        required
                        onInput={(e) => {
                            if (e.target.value.length > 3) {
                                e.target.value = e.target.value.slice(0, 3);
                            }
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={values.name}
                        onChange={e => setValues({ ...values, name: e.target.value })}
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Signup Date</label>
                    <input
                        type="date"
                        value={values.signupDate}
                        onChange={e => setValues({ ...values, signupDate: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Solde</label>
                    <input
                        type="number"
                        value={values.solde}
                        onChange={e => setValues({ ...values, solde: e.target.value })}
                        placeholder="Solde"
                        min="0"
                        step="0.01" // Allow decimal values
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        value={values.password}
                        onChange={e => setValues({ ...values, password: e.target.value })}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="login-button">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default Signup;