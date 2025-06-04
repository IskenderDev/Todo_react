/* eslint-disable react/prop-types */
import todo from '../../assets/todo.svg'
import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from './header.module.css';
import { useState } from 'react';

export function Header({ onAddTask, userName, onLogout }) {

    const [text, setText] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        if (text == '') {
            return null;
        } else {
            onAddTask(text)
            setText('')
        }
    }

    function onChangeTitle(event) {
        setText(event.target.value)
    }

    return (
        <header className={styles.header}>
            <img src={todo} alt="" />
            <div className={styles.userArea}>
                <span className={styles.user}>{userName}</span>
                {onLogout && (
                    <button type="button" onClick={onLogout} className={styles.logoutBtn}>
                        Logout
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className={styles.newTaskForm}>
                <input type="text" placeholder='Add a New Task' value={text} onChange={onChangeTitle} />
                <button>
                    Create
                    <AiOutlinePlusCircle size={22} />
                </button>
            </form>
        </header>
    )
}