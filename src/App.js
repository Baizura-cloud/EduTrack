import Auth from "./pages/auth";
import { supabase } from "./client";
import "./App.css";
import Main from "./pages/main";
import { useEffect, useState } from "react";
import ProtectedRoute from "./router/protectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import ErrorPage from "./pages/404";
import Account from "./pages/account"
import CircularLoading from "./components/loading";

function App(){
  const router = createBrowserRouter([
    {
      path:"/",
      element: <div className="App"><header className="App-header"><Auth/></header></div>,
      errorElement: <ErrorPage/>
    },
    {
      path:"/main",
      element: <ProtectedRoute><Main/></ProtectedRoute>,
      children:[
        {
          path: "dashboard",
          element: <Dashboard/>
        },
        {
          path: "account",
          element: <Account/>
        }
      ]
    }
  ])

  return(
    <RouterProvider router={router} fallbackElement={<CircularLoading/>}/>
  )
}
// function App() {
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });
//     return () => subscription.unsubscribe();
//   }, []);

//   if (!session) {
//     return (
//       <div className="App">
//       <header className="App-header">
//         <Auth />
//       </header>
//     </div>
//     )
//   }
//   else {
//     return (
//       <div className="App">
//       <Main/>
//     </div>
//     )
//   }

//}

export default App;
