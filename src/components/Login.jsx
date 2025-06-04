/* eslint-disable react/prop-types */
import { useState } from 'react';

const USER_API_URL = "https://65f019aada8c6584131ac3e0.mockapi.io/Todo/Stalin/user";

export function Login({ onLogin, onShowRegister }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(USER_API_URL);
      const users = await response.json();
      const found = users.find(
        (u) => u.name === name && String(u.password) === String(password)
      );
      if (found) {
        onLogin(found);
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error('Login failed', err);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <button type="button" onClick={onShowRegister}>Register</button>
    </form>
  );
}
