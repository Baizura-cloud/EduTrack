import "./App.css";
import Auth from "./pages/auth";
import ErrorPage from "./pages/404";
import Account from "./pages/account"
import Dashboard from "./pages/dashboard";
import Drawer from "./components/drawer";
import Unauthorized from "./pages/unautharized";
import Team from "./pages/team";
import Course from "./pages/course";
import Schedule from "./pages/schedule";
import { AuthProvider, RequireAuth } from "./context/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route  element={<div className="App"><header className="App-header"><Auth /></header></div>}path="/login"/>
        <Route element={<Drawer />}>
        <Route element={<div className="App"><Unauthorized /></div>}path="/unauthorized"/>
        <Route element={<div className="App"><ErrorPage /></div>}path="/error"/>
        <Route element={<RequireAuth />}>
           <Route element={<div className="App"><Dashboard /></div>}path="/"/>
           <Route element={<div className="App"><Team /></div>}path="/team"/>
           <Route element={<div className="App"><Course /></div>}path="/course"/>
           <Route element={<div className="App"><Schedule /></div>}path="/schedule"/>
          <Route element={<div className="App"><Account /></div>}path="/account"/>
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;
