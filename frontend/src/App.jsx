import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [msg, setMsg] = useState('')

  useEffect( async () => {
    const res = await fetch('http://localhost:8000');
    const data = await res.json();
    setMsg(data.msg);
  }, [msg])

  return (
    <div className="App">
      <h1>{msg || 'Hello'}</h1>
    </div>
  )
}

export default App
