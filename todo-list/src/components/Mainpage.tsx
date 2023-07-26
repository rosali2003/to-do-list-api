import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useCallback,
} from "react";
import { TodoCard } from "./TodoCard";
import styles from "./Mainpage.module.css";
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

const csrfToken = Cookies.get("CSRF-TOKEN");

axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;

const Mainpage = () => {
  const [tasks, setTasks] = useState([
    {
      message: "wash dishes",
      completed: false,
    },
  ]);

  const api = axios.create();

  const [newTask, setNewTask] = useState<string>("");

  //can add useMemo so if tasks does not change in between renders, it uses the same one
  const fetchTasks = async () => {
    try {
      const response = await api.get("http://localhost:3000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTasks((prevTasks) => [
      ...prevTasks,
      { message: newTask, completed: false },
    ]);

    if (newTask.length === 0) return;

    const url = "http://localhost:3000/tasks/create";
    const data = {
      message: newTask,
      completed: false,
    };

    console.log("csrfToken", csrfToken);
    api
      .post(url, data, {
        headers: {
          "x-xsrf-token": csrfToken,
        },
      })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));

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

      <div className="col-md-4">
          {tasks.map((task, index) => (
            <TodoCard
              //change this to an id since index is based on position in array
              key={index}
              message={task.message}
              completed={task.completed}
              tasks={tasks}
            />
          ))}
        </div>
    </section>
  );
};

export default Mainpage;
//add tests,
