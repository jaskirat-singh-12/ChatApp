import logo from './logo.svg';
import './App.css';
import Dashboard from './Pages/Dashboard'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Chatbox from './Pages/Chatbox'
import {BrowserRouter , Routes , Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Login></Login>}></Route>
          <Route path='Signup' element = {<Signup></Signup>} ></Route>
          <Route path='Dashboard' element = {<Dashboard></Dashboard>}></Route>
          <Route path='room/:sender/:reciever' element={<Chatbox/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
