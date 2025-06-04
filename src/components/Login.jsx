/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './login.module.css';

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
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.button} type="submit">Login</button>
      <button className={styles.secondaryButton} type="button" onClick={onShowRegister}>Register</button>
    </form>
  );
}
