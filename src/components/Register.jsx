/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './register.module.css';

const USER_API_URL = "https://65f019aada8c6584131ac3e0.mockapi.io/Todo/Stalin/user";

export function Register({ onRegister, onShowLogin }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(USER_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
      });
      const user = await response.json();
      onRegister(user);
    } catch (err) {
      console.error('Registration failed', err);
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
      <button className={styles.button} type="submit">Register</button>
      <button className={styles.secondaryButton} type="button" onClick={onShowLogin}>Back to Login</button>
    </form>
  );
}
