import { BrowserRouter,HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import './App.scss';
import StoryRead from './views/StoryRead';
import Home from './views/Home/Home';
import Profile from './views/Account/Profile';
import ChangePassword from './views/Account/ChangePassword';
import Account from './views/Account/Account';
import TuTruyen from './views/Account/TuTruyen';

function App() {
  return (
    <HashRouter>
      <Header />
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='truyen' element={<StoryRead />}></Route>
            <Route path='account' element={<Account />}>
                <Route path='profile' element={<Profile />}></Route>
                <Route path='change-password' element={<ChangePassword />}></Route>
                <Route path='tu-truyen' element={<TuTruyen />}></Route>
            </Route>
          </Routes>
          
    </HashRouter>
  );
}

export default App;
