/* eslint-disable react/prop-types */
import styles from './tasks.module.css';
import { Task } from '../task';

export function Tasks({ tasks, onComplete, onDelete }) {

    const tasksQuantity = tasks.length
    const completedTask = tasks.filter(task => task.isCompleted).length

    const grouped = tasks.reduce((acc, task) => {
        const group = task.group || 'General'
        if (!acc[group]) acc[group] = []
        acc[group].push(task)
        return acc
    }, {})

    return (
        <section className={styles.tasks}>
            <header className={styles.header}>
                <div>
                    <p>Created Task</p>
                    <span>{tasksQuantity}</span>
                </div>
                <div>
                    <p className={styles.completed}>Completed Tasks</p>
                    <span>{completedTask} of {tasksQuantity}</span>
                </div>
            </header>

            <div className={styles.list}>
                {Object.entries(grouped).map(([group, groupTasks]) => (
                    <div key={group} className={styles.group}>
                        <h3 className={styles.groupTitle}>{group}</h3>
                        {groupTasks.map(task => (
                            <Task key={task.id} task={task} onComplete={onComplete} onDelete={onDelete} />
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}