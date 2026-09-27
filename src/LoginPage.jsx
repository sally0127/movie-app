import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import { app } from './firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('')

    const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/');
    } catch (error) {
      setError('登入失敗: ' + error.message)
    }
  }   
  return(
    <div className="auth-page">
      <h1>登入</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">登入</button>
      </form>
    </div>
  )
}