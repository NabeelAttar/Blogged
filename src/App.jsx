import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';   
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
 
function App() {

  const [loading, setLoading] = useState(true); //sometimes operations take time, so we need to show loading state
  const dispatch = useDispatch();

  // jaisehi application load ho, ask login ho ki nhi-> useEffect
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        // userData mila mtlb user loggedin hai
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
      // humesha valid user hai login ho ga hi 
    })
    .finally(() => setLoading(false)) // chahe promise resolve ho ya reject ho, finally chalega
  }, [])

  // conditional rendering
  return !loading ? (
    <div className="min-h-screen flex flex-col bg-[#0F0F0F]">
      <Header />
      <main className="flex-1 pt-[60px]"> {/* flex-1 will make it take remaining space */}
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : <div>Loading...</div>
}

export default App
