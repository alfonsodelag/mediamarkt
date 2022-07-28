import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import Home from "./components/Home";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const users = await axios.get("http://localhost:3001/users");
      setUsers(users.data);
    };

    getUsers();
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/add" element={<AddUser />} />
          <Route
            path="/edit/:id"
            element={<EditUser users={users} setUsers={setUsers} />}
          />
          <Route path="/" element={<Home users={users} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
