import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
  const { auth } = useSelector(state => state.auth);   

   if(!auth){
    if (window.localStorage.getItem(auth)) {
        return <Navigate to="/" replace />;
      }
    
   } 
  
  return children;
}

export default ProtectedRoute;