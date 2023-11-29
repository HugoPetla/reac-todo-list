import { Trash } from "@phosphor-icons/react";

import { Task } from "../App";
import styles from "./ListTodo.module.css";
import Clipboard from "../assets/clipboard.png";

interface ListTodoProps {
  tasks: Task[];
  onHandleDeleteTask: (id: string) => void;
  onHandleChangeTaskCompleted: (id: string, isCompleted: boolean) => void;
}

export function ListTodo({
  tasks,
  onHandleDeleteTask,
  onHandleChangeTaskCompleted,
}: ListTodoProps) {
  const countFinishedTasks = tasks.reduce((finished: number, task) => {
    if (task.isComplete === true) {
      return finished + 1;
    }
    return finished;
  }, 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tasksInformation}>
        <div>
          <strong>Tarefas criadas</strong>
          <p>{tasks.length}</p>
        </div>
        <div>
          <strong>Concluídas</strong>
          {tasks.length === 0 && <p>0</p>}
          {tasks.length > 0 && (
            <p>
              {countFinishedTasks} de {tasks.length}
            </p>
          )}
        </div>
      </div>
      {tasks.length > 0 &&
        tasks.map((task) => (
          <div key={task.id} className={styles.checkboxCard}>
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                checked={task.isComplete}
                id={`checkbox-${task.id}`}
                onChange={() =>
                  onHandleChangeTaskCompleted(task.id, !task.isComplete)
                }
              />
              <label htmlFor={`checkbox-${task.id}`}></label>
            </div>
            <p
              className={
                task.isComplete ? styles.taskTitleFinished : styles.taskTitle
              }
            >
              {task.title}
            </p>
            <button
              onClick={() => onHandleDeleteTask(task.id)}
              title="Deletar task"
            >
              <Trash />
            </button>
          </div>
        ))}

      {tasks.length === 0 && (
        <div className={styles.emptyTaks}>
          <img src={Clipboard} />
          <div>
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        </div>
      )}
    </div>
  );
}
