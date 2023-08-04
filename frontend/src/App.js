// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css'
import FormComponent from './components/FormComponent';
import DisplayInfoComponent from './components/DisplayInfoComponent';
import { getUsers, createUser } from './api';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import UserForm from './components/FormComponent';
const App = () => {
  const [users, setUsers] = useState([]);

 

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);


  const handleCreateUser = async (userData) => {
    try {
      const newUser = await createUser(userData);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

 


  return (
  <>
  
      <Router>
      <div>
     
        <Routes>
          <Route exact path="/"  element={<UserForm onSubmit={handleCreateUser} />} />
          <Route exact path="/display-info" element={  <DisplayInfoComponent users={users} />} />
      
        </Routes>
      </div>
    </Router>
    </>
  );
};

export default App;