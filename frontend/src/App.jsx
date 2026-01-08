
import { SignIn, SignInButton, useUser } from '@clerk/clerk-react'
import { Routes , Route, Navigate} from 'react-router'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import { Toaster } from 'react-hot-toast';
function App() {
  
  const {isSignedIn}= useUser();

  return (
    <>
      <Routes>
      
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/problem" element={isSignedIn?<Problem/>: <Navigate to="/" />}/>
    
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
