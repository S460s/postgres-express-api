import NavBar from './components/NavBar';
import { createContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignUpForm';
import { injectUser } from './utils/localStorage';
import Profile from './components/Profile';
import Logout from './components/Logout';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    injectUser(setUser, user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </UserContext.Provider>
  );
}
export default App;
