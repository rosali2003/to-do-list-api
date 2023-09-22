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
import { useOpenAIApi } from "./useOpenAIApi";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useGoogleCalendar } from "./useGoogleCalendar"; 
import Button from './Button';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbf1E4J10hk9J2SpgytjGDxP-CYLcHd5g",
  authDomain: "agendify-3cb32.firebaseapp.com",
  projectId: "agendify-3cb32",
  storageBucket: "agendify-3cb32.appspot.com",
  messagingSenderId: "567748474164",
  appId: "1:567748474164:web:b3c616b48d87c47013e161",
  measurementId: "G-XG3XJV4V2Y"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider(); 

const auth = getAuth();
const handleLogin = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

// Set up a listener for the auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, redirect to the desired page
    window.location.href = "localhost:3001";
  } else {
    // User is not signed in
  }
});


const csrfToken = Cookies.get("CSRF-TOKEN");

axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;

const Mainpage = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      message: "wash dishes",
      completed: false,
    },
  ]);

  const api = axios.create();

  const [newTask, setNewTask] = useState<string>("");

  const [generatedIdea, setGeneratedIdea] = useState<string>("");

  const { loginGoogleCalendar } = useGoogleCalendar();
  const fetchGenerated = async () => {
    console.log("entering");
    try {
      const response = await api.post(
        "http://localhost:3000/pages/ai_request",
        {
          ai_request: {
            prompt: "create list of tasks",
            ai_model: "ada",
          },
        }
      );
      console.log("generated text", response.data.generated_idea);
      setGeneratedIdea(response.data.generated_idea);
    } catch (error) {
      console.error(error);
    }
  };

  //can add useMemo so if tasks does not change in between renders, it uses the same one
  const fetchTasks = async () => {
    try {
      const response = await api.get("http://localhost:3000/tasks");
      // console.log("response.data", response.data)
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
    const newId = tasks[tasks.length - 1].id + 1;

    setTasks((prevTasks) => [
      ...prevTasks,
      { id: newId, message: newTask, completed: false },
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
      <div className={styles["navbar"]}>
        <span className={styles["title"]}>Task Tracker</span>
      </div>
      <div className={styles["widgets-container"]}>
        <div>
          <form data-testid="task-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="task-input"
              data-testid="task-input"
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
                key={index}
                id={task.id}
                message={task.message}
                completed={task.completed}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))}
          </div>
        </div>
        <section className={styles["quote-container"]}>
          <button onClick={fetchGenerated}>Quote of the day</button>
          <p>{generatedIdea}</p>
        </section>
        <div>
        {loginGoogleCalendar()}
        </div>
      </div>
    </section>
  );
};

export default Mainpage;
//add tests,
