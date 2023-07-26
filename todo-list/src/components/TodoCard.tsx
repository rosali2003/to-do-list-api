import styles from "./TodoCard.module.css";
import React from "react";
import axios from "axios";

interface TodoCardProps {
  message: string;
  completed: boolean;
  tasks: {message: string; completed: boolean}[];
}
export const TodoCard: React.FC<TodoCardProps> = ({ message, completed, tasks }) => {

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/tasks/index`)
    .then(response => {
      if (response.data.status === 'SUCCESS') {
        // The post was deleted successfully
        // You can use this data to update the UI
        console.log('Post deleted successfully:', response.data);
      } else {
        // There was an error
        console.log('Error deleting post:', response.data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  return (
    <section className={styles["todo-body"]}>
        {`Task: ${message}`}
        <label htmlFor="completed">Completed: </label>
        <input
          type="checkbox"
          name="checkbox"
          value={completed.toString()}
          onChange={handleDelete}
        ></input> 

    </section>
  );
};
