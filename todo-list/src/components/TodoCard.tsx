import styles from "./TodoCard.module.css";
import React from "react";
import axios from "axios";

interface TodoCardProps {
  id: number;
  message: string;
  completed: boolean;
  tasks: { message: string; completed: boolean }[];
  setTasks: React.Dispatch<
    React.SetStateAction<{ id: number; message: string; completed: boolean }[]>
  >;
}

export const TodoCard: React.FC<TodoCardProps> = ({
  id,
  message,
  completed,
  tasks,
  setTasks,
}) => {
  const handleDelete = () => {
    console.log("route", `http://localhost:3000/tasks/${id}`);
    axios
      .delete(`http://localhost:3000/tasks/${id}`)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          console.log("entering");
          console.log("Post deleted successfully:", response.data);
          setTasks((tasks) => tasks.filter((task) => task.id !== id));
          alert("Post deleted successfully");
        } else {
          // There was an error
          console.log("Error deleting post:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCompleted = () => {
    if (completed === false) {
      completed = true;
    } else {
      completed = false;
    }
    console.log("completed", completed);

    const payload = {
      id,
      message,
      completed: true,
    };

    axios
      .put(`http://localhost:3000/tasks/${id}`, payload)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  return (
    <section className={styles["todo-body"]}>
      {`Task: ${message}`}
      <div>
        <label htmlFor="completed" className={styles["completed-label"]}>Completed:  </label>
        <input
          type="checkbox"
          name="checkbox"
          value={completed.toString()}
          onChange={handleCompleted}
        ></input>
      </div>
      <button onClick={handleDelete} className={styles["delete-button"]}>delete task</button>
    </section>
  );
};
