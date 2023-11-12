// import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Reg from './components/Reg';
import Dash from './components/Dash';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import ProjectDetails from './components/task/[id].tsx';
import EditProfile from './components/EditProfile';
import AddTask from './components/task/AddTask';
import Assign from './components/task/Assign';
import Newdash from './components/Newdash';
import Sidebar from './components/Sidebar'
function App() {
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
          
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter> */}

      {/* <Navbar />
      <Home /> */}

      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Reg />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/dash' element={<Dash />} />
            <Route path='/task/:id' element={<ProjectDetails />} />
            <Route path='/EditProfile' element={<EditProfile />} />
            <Route path='/task/AddTask' element={<AddTask />} />
            <Route path='/task/Assign' element={<Assign />} />
            <Route path='/Newdash' element={<Newdash />} />
          </Route>
          <Route path='/login' element={<Login />} />
          {/* <Route exact path='/register' element={<Register/>}/> */}
        </Routes>
      </Router>

    </>
  );
}

export default App;
