import Auth from './pages/auth';
import ResetPassword from './pages/resetPassword';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Auth/>
        {/* <ResetPassword/> */}
      </header>
    </div>
  );
}

export default App;
