import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SocilLogin from './SocialLogin'
import FacebookAuth from './FacebookAuth'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SocilLogin/><br></br>

    </>
  )
}

export default App
