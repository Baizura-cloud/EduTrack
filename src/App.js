import Auth from "./pages/auth";
import { supabase } from "./client";
import "./App.css";
import Main from "./pages/main";

import ProtectedRoutes from "./router/protectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <div className="App">
              <header className="App-header">
                <Auth />
              </header>
            </div>
          }
          path="/login"
        />
        <Route element={<ProtectedRoutes />}>
          <Route
            element={
              <div className="App">
                <Main />
              </div>
            }
            path="/"
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
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
//       <div className="App"><header className="App-header"><Auth/></header></div>
//     )
//   }
//   else {
//     return (
//       <div className="App">
//       <Main/>
//     </div>
//     )
//   }

// }

export default App;
