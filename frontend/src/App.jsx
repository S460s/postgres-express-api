import NavBar from './components/NavBar';
import { createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

export const UserContext = createContext();

function App() {
  return (
    <>
      <UserContext.Provider value={{ ok: true }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}
export default App;
