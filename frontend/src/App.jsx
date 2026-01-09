
import { SignIn, SignInButton, useUser } from '@clerk/clerk-react'
import { Routes , Route, Navigate} from 'react-router'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import { Toaster } from 'react-hot-toast';
import ProblemsPage from './pages/ProblemsPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Problem from './pages/Problem.jsx';
function App() {
  
  const {isSignedIn}= useUser();

  return (
    <>
      <Routes>
      
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/problems" element={<ProblemsPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/problem/:id" element={<Problem/>}/>
        {/* <Route path="/problems" element={isSignedIn?<ProblemsPage/>: <Navigate to="/" />}/> */}
    
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
