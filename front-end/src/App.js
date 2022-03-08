import { BrowserRouter,HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import './App.scss';
import Home from './views/Home/Home';
import Account from './views/Account/Account';
import TuTruyen from './views/Account/TuTruyen';
import Admin from './views/Account/Admin';
import Users from './views/Account/Users';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from './views/PrivateRoute';
import StoryDetail from './views/StoryDetail/StoryDetail';
import Active from './views/Active/Active';
import Chapter from './views/Chapter/Chapter';

function App() {
  return (
    <HashRouter>
      <Header />
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='truyen/:url' element={<StoryDetail />}></Route>
            <Route path='user/*' element={<PrivateRoute roles={['USER']}><Account /></PrivateRoute>}></Route>
            <Route path='admin/*' element={<PrivateRoute roles={['ADMIN']}><Admin /></PrivateRoute>}></Route>
            <Route path='active/:token' element={<Active />}></Route>
            <Route path='truyen/:url/:chapnum' element={<Chapter />}></Route>
          </Routes>
    <ToastContainer/>
    </HashRouter>
  );
}

export default App;
