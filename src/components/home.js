import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './app.css';


function Home () {

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');



  useEffect(()=>{
    axios.get('http://localhost:5000/profilName')
    .then(res => {
        if(res.data.Status === "Success"){
            setAuth(true)
            setName(res.data.name)
            Navigate('/login'); 
        }else{
            setAuth(false)
            setMessage(res.data.Error);
        }
    })
    .catch(err => {
        console.log(err)
    });
  }, [])

  const handelogout = ()=> {
    axios.get('http://localhost:5000/logout')
    .then(res => {
      // eslint-disable-next-line no-restricted-globals
      location.reload(true);
    }).catch(err => console.log(err))
  }
  return (

    <div className="centered-container">
    <div className="content">
        {
          auth ?
          <div>
            <h2> hello {name} you are authorized to visite this page</h2>
            <Link to ="/" onClick={handelogout} className='btn btn-danger'>logout</Link>
          </div>
          :
          <div>
            <h2> {message}</h2>
            <Link to ="/" className = 'btn btn-primary'>login</Link>
          </div>
        }
    </div>
  </div>

  );
};

export default Home;