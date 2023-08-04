const User=require('./schema')
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// Endpoint to get all users
router.get('/user', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching users' });
    }
  });
  
  // Endpoint to create a new user
  router.post('/user', async (req, res) => {
   
    try {
      // Calculate the age based on the dateofbirth in the request body
      const today = new Date();
      const birthDate = new Date(req.body.dateofbirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      // Include the calculated age in the user object before creating it
      const newUser = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        gender: req.body.gender,
        dateofbirth: req.body.dateofbirth,
        age: age, 
      });
  
      res.status(201).send(newUser);
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  });

      
 
  module.exports = router;