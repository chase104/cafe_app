import React, { useEffect, useState } from 'react';
import { logIn } from '../../utilities/user-functions.js'
import axios from 'axios'



const Login = () => {
  
    const [formState, setFormState] = useState({email: '', password: ''});
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(true)
    useEffect(() => {
        setDisabled(formState.email && formState.password ? false : true);
    }, [formState])

    // useEffect(() => {
    //   let asyncCall = async () => {
    //     let res = await axios("/session-info")
    //     console.log(res.data);
    //   }
    //   asyncCall()
    // }, [])

    useEffect(() => {
      let getSessionInfo = async () => {
        let res = await axios('/session-info')
        console.log(res);
      }
      getSessionInfo()
    }, [])


    const handleChange = (event) => {
        let propertyName = event.target.name;
        setFormState({
            ...formState,
            [propertyName]: event.target.value,
        });
      };

    const handleSubmit = async (e) => {
        // make a call to the server with this info and authenticate!
        e.preventDefault();
        let response = await logIn(formState);

    }

  return (
    <div>
        <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" name="email" value={formState.email} onChange={handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={formState.password} onChange={handleChange} required />
            <button type="submit" disabled={disabled}>Log In</button>
        </form>
        </div>
        <p className="error-message">&nbsp;{error}</p>
    </div>
  )
}

export default Login;

