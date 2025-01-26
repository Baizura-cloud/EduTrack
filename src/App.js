import "./App.css";
import Auth from "./pages/auth";
import ErrorPage from "./pages/404";
import Account from "./pages/account"
import Dashboard from "./pages/dashboard";
import Drawer from "./components/drawer";
import ResetPassword from "./pages/resetPassword";
import Classroom from "./pages/classroom";
import Course from "./pages/course";
import Exam from "./pages/exam";
import { AuthProvider, RequireAuth } from "./context/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route  element={<div className="App"><header className="App-header"><Auth /></header></div>}path="/"/>
        <Route element={<div className="App"><ResetPassword /></div>}path="/resetpassword"/>
        <Route element={<Drawer />}>
        <Route element={<div className="App"><ErrorPage /></div>}path="/error"/>
        <Route element={<RequireAuth />}>
           <Route element={<div className="App"><Dashboard /></div>}path="/dashboard"/>
           <Route element={<div className="App"><Classroom /></div>}path="/classroom"/>
           <Route element={<div className="App"><Course /></div>}path="/courses"/>
           <Route element={<div className="App"><Exam /></div>}path="/exam"/>
          <Route element={<div className="App"><Account /></div>}path="/account"/>
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;
