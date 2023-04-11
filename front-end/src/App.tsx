import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./views/Home/Home";
// import Account from "./views/Account/Account";
// import Admin from "./views/Account/Admin";

// import PrivateRoute from "./views/PrivateRoute";
 import StoryDetail from "./views/StoryDetail/StoryDetail";
// import Active from "./views/Active/Active";
 import ChapterView from "./views/ChapterView/ChapterView";
// import Search from "./views/Search/Search";
// import AllStory from "./views/AllStory/AllStory";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./scss/App.scss";
import Payment from "views/Payment/Payment";
import ResultPayment from "views/ResultPayment/ResultPayment";
import { axiosInstance } from './api/axiosClient'
import CheckAuthentication from "components/CheckAuthentication/CheckAuthentication";
import ScrollToTop from "components/ScrollToTop";
import { useEffect } from "react";
// import apiMain from "api/apiMain";
import { authStore } from "store/authStore";

function App() {
  const refreshToken = authStore((state) => state.auth?.refreshToken);
  const accessToken = authStore((state) => state.auth?.accessToken);
  const loginSuccess = authStore(state => state.loginSuccess)
  const logoutSuccess = authStore(state => state.logoutSuccess)

  if (accessToken && refreshToken) {
    axiosInstance({ accessToken, refreshToken }, loginSuccess, logoutSuccess);
  }
  // useEffect(()=>{
  //   apiMain.updateTraffic()
  // },[])
  return (
    <BrowserRouter>
      <CheckAuthentication>

        <Header />
        <ScrollToTop>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="truyen/:url" element={<StoryDetail />} />
            <Route path="truyen/:url/:chapnum" element={<ChapterView />} />
       {/* 
        <Route path="/user/*" element={<Account />} />
        {/* <Route element={<PrivateRoute roles={["ADMIN"]} />}>
          <Route path="admin/*" element={<Admin />} />
        </Route> 
        <Route path="active/:token" element={<Active />} />
        
        <Route path="tim-kiem" element={<Search />} />
        <Route path="tat-ca" element={<AllStory />} />
        <Route path="payment" element={<Payment />} />
        <Route path="result-payment" element={<ResultPayment />} /> */}
          </Routes>
        </ScrollToTop>
        <Footer />
      </CheckAuthentication>
      <ToastContainer
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover={false}
      />
    </BrowserRouter>
  );
}

export default App;
