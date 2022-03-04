import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import './App.scss';
import StoryRead from './views/StoryRead';
import Home from './views/Home/Home';
import Layout from './components/Layout';
import Profile from './views/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='truyen' element={<StoryRead />}></Route>
            <Route path='profile' element={<Profile />}></Route>
          </Routes>
          
    </BrowserRouter>
  );
}

export default App;
