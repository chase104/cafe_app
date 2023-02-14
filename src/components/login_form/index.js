import React, { useState } from 'react';

const Login = () => {

    const [formState, setFormState] = useState({email: '', password: ''});
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        let propertyName = event.target.name;
        setFormState({
            [propertyName]: event.target.value,
        });
      };

    const handleSubmit = () => {

    }
    let disabled = email && password ? false : true;
  return (
    <div>
    <div className="form-container">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" value={formState.email} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" value={formState.password} onChange={handleChange} required />

        <button type="submit" disabled={disable}>Login</button>
      </form>
    </div>
    <p className="error-message">&nbsp;{error}</p>
  </div>
  )
}

export default Login;

