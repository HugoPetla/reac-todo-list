import { useState } from "react";

import styles from "./App.module.css";
import { CreateTodo } from "./components/CreateTodo";
import { Header } from "./components/Header";
import { ListTodo } from "./components/ListTodo";

export interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleCreateNewTodo(newTask: Task) {
    setTasks([...tasks, newTask]);
  }

  function handleDeleteTask(id: string) {
    const newTaskArray = tasks.filter((task) => task.id !== id);

    setTasks(newTaskArray);
  }

  function handleChangeTaskCompleted(id: string, isCompleted: boolean) {
    const updatedTaskArray = tasks.map((task) => {
      if (task.id === id) {
        task.isComplete = isCompleted;
      }

      return task;
    });

    setTasks(updatedTaskArray);
  }

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <CreateTodo onHandleCreateNewTask={handleCreateNewTodo} />
        <ListTodo
          tasks={tasks}
          onHandleDeleteTask={handleDeleteTask}
          onHandleChangeTaskCompleted={handleChangeTaskCompleted}
        />
      </div>
    </div>
  );
}

export default App;
