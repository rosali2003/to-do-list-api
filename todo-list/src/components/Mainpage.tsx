import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { TodoCard } from "./TodoCard";
import styles from "./Mainpage.module.css";
import React from "react";

const Mainpage = () => {
  const [tasks, setTasks] = useState([
    {
      message: "wash dishes",
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTasks((prevTasks) => [
      ...prevTasks,
      { message: newTask, completed: false },
    ]);

    setNewTask("");
  };

  return (
    <section className={styles["mainpage-body"]}>
      <h1>To-do app</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="task-input"
          value={newTask}
          onChange={(event: ChangeEvent<HTMLInputElement>): void => {
            setNewTask(event.target.value);
          }}
        />
        <button type="submit">Create Task</button>
      </form>


      <div className={styles["todo-list"]}>
        {tasks.map((task, index) => (
          <TodoCard
            key={task.message}
            message={task.message}
            completed={task.completed}
            tasks={tasks} //is this the right way to do it? is there a better way?
          />
        ))}
      </div>
    </section>
  );
};

export default Mainpage
//add tests,
