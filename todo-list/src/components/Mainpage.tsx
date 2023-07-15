import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { TodoCard } from "./TodoCard";
import styles from "./Mainpage.module.css";
import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

const csrfToken = Cookies.get('CSRF-TOKEN');

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;

const Mainpage = () => {
  const [tasks, setTasks] = useState([
    {
      message: "wash dishes",
      completed: false,
    },
  ]);

  const api = axios.create();
  // Add a request interceptor
  // api.interceptors.request.use(config => {
  //   const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  //   config.headers['X-CSRF-Token'] = csrfToken;
  //   return config;
  // });

  const [newTask, setNewTask] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTasks((prevTasks) => [
      ...prevTasks,
      { message: newTask, completed: false },
    ]);

    if(newTask.length === 0) return;

    const url = "http://localhost:3000/tasks/create";
    const data = {
      message: newTask,
      completed: false
    }

    console.log("csrfToken", csrfToken)
    api.post(url, data, {withCredentials: true})
    .then(response => console.log(response))
    .catch(error => console.error(error))

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
