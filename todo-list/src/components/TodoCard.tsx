import styles from "./TodoCard.module.css";
import React from "react";

interface TodoCardProps {
  message: string;
  completed: boolean;
  tasks: {message: string; completed: boolean}[];
}
export const TodoCard: React.FC<TodoCardProps> = ({ message, completed, tasks }) => {

  const handleDelete = () => {
  }
  return (
    <section className={styles["todo-body"]}>
        {`Task: ${message}`}
        <label htmlFor="completed">Completed: </label>
        <input
          type="checkbox"
          name="checkbox"
          value={completed.toString()}
        ></input> 

    </section>
  );
};
