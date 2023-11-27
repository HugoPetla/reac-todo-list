import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./App.module.css";
import { CreateTodo } from "./components/CreateTodo";
import { Header } from "./components/Header";

export interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: uuidv4(), title: "Lavar a louça", isComplete: false },
  ]);

  function handleCreateNewTodo(newTask: Task) {
    setTasks([...tasks, newTask]);
  }

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <CreateTodo onHandleCreateNewTask={handleCreateNewTodo} />
        {tasks.map((task) => (
          <div key={task.id}>
            <h1>{task.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
