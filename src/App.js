import Auth from "./pages/auth";
import { supabase } from "./client";
import "./App.css";
import Main from "./pages/main";
import { useEffect, useState } from "react";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="App">
      <header className="App-header">
        <Auth />
      </header>
    </div>
    )
  }
  else {
    return (
      <div className="App">
      <header className="App-header">
      <Main/>
      </header>
    </div>
    )
  }

}

export default App;
