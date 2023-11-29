import { PlusCircle } from "@phosphor-icons/react";
import { v4 as uuidv4 } from "uuid";

import styles from "./CreateTodo.module.css";
import { Task } from "../App";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

interface CreateTodoProps {
  onHandleCreateNewTask: (task: Task) => void;
}

export function CreateTodo({ onHandleCreateNewTask }: CreateTodoProps) {
  const [taskTitle, setTaskTitle] = useState("");

  function handleNewTaskTitleChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setTaskTitle(event.target.value);
  }

  function onPrepareCreateNewTask(event: FormEvent) {
    event.preventDefault();

    onHandleCreateNewTask({
      id: uuidv4(),
      title: taskTitle,
      isComplete: false,
    });

    setTaskTitle("");
  }

  function handleNewTaskTitleInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório");
  }

  const isNewTaskTitleEmpty = taskTitle.length === 0;

  return (
    <form className={styles.wrapper} onSubmit={onPrepareCreateNewTask}>
      <input
        required
        className={styles.input}
        placeholder="Adicione uma nova tarefa"
        value={taskTitle}
        onChange={handleNewTaskTitleChange}
        onInvalid={handleNewTaskTitleInvalid}
      ></input>
      <button
        type="submit"
        className={styles.button}
        disabled={isNewTaskTitleEmpty}
        title="Criar nova task"
      >
        Criar <PlusCircle />
      </button>
    </form>
  );
}
