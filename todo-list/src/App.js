import './App.css';
import axios from 'axios';
import Mainpage from './components/Mainpage'
 
const API_URL = "http://localhost:3000/api/v1/book";

function getAPIData() {
  return axios.get(API_URL).then((response) => response.data)
}

function App() {
  return (
    <div className="App">
     <Mainpage />
    </div>
  );
}

export default App;
