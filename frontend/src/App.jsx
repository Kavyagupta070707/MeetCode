import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SignIn, SignInButton } from '@clerk/clerk-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Welcome</h1>

      <SignInButton mode='modal'/>
    </div>
  )
}

export default App
