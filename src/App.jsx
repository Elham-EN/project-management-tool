import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Create from "./pages/create/Create";
import Project from "./pages/project/Project";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { useAuthContext } from "./hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import OnlineUsers from "./components/onlineusers/OnlineUsers";

function App() {
  //We wait until auth is ready, when user login
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {
        //We are only going to render all of our application when
        //authentication is ready (whether user is logged in or not)
        authIsReady && (
          <BrowserRouter>
            {user && <Sidebar />}
            <div className="container">
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  element={user ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                  path="/login"
                  element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route
                  path="/signup"
                  element={!user ? <Signup /> : <Navigate to="/" />}
                />
                <Route
                  path="/create"
                  element={user ? <Create /> : <Navigate to="/login" />}
                />
                <Route
                  path="/project/:id"
                  element={user ? <Project /> : <Navigate to="/login" />}
                />
              </Routes>
            </div>
            {user && <OnlineUsers />}
          </BrowserRouter>
        )
      }
    </div>
  );
}

export default App;
