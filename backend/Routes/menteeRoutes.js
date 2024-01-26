const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/menteeModel'); // Adjust the path as needed
// const Atri=require("../models/menteeAtrModel")
const axios = require('axios');
const{RegisterUser,loginUser,getMe}=require("../Controllers/menteeControllers")
const {protect} =require("../middlewares/authmiddlewares")


router.post("/registerr",RegisterUser)
router.post("/loginn",loginUser)
router.get("/me",protect,getMe)


// Registration Route
router.post('/register', async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      accountType,
      about,
      experience,
      education,
    } = req.body;
 
  const userExists=await User.findOne({email})
  if(userExists){
      res.status(400)
      throw new Error("User already exists")
  }

    const newUser = new User({
      email,
      password,
      username,
      accountType,
      about,
      experience,
      education,
    });
   

    const savedUser = await newUser.save();

    // Create a JSON Web Token (JWT) for the registered user
    const token = jwt.sign({ userId: savedUser._id, accountType: savedUser.accountType }, 'your_secret_key', {
      expiresIn: '1h', // Adjust the expiration time as needed
    });

    res.status(201).json({ token, user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findOne({ email });
    
    // if(user && (await bcrypt.compare(password,user.password)) ){
    //     res.json({
    //         email:user.email,
            
            
    //     })
        
    // }else{
    //     res.status(400)
    //     throw new Error("invalid credentials")
    // }
    if (!user) {
      return res.status(401).json({ error: 'user not found' });
    }

    //Check if the password is correct
    // const passwordMatch = await bcrypt.compare(password, user.password);

    // if (!passwordMatch) {
    //   return res.status(401).json({ error: 'Invalid credentials' });
    // }

    // Create a JSON Web Token (JWT)
    const token = jwt.sign({ userId: user._id, accountType: user.accountType }, 'your_secret_key', {
      expiresIn: '1h', // Adjust the expiration time as needed
    });

    // Redirect based on the account type
    if (user.accountType === 'mentor') {
      return res.json({ token, redirect: '/mentor-dashboard' });
    } else if (user.accountType === 'mentee') {
      return res.json({ token, redirect: '/mentee-dashboard' });
    }

    // Handle other account types or scenarios as needed
    return res.json({ token, redirect: '/default-dashboard' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/recommend', async (req, res) => {
  try {
    const menteeInput = req.body.menteeInput; 
    

    // Make a request to the Flask app
    const response = await axios.post('http://127.0.0.1:5000/recommend', { mentee_input: menteeInput });

    // Assuming Flask returns recommended mentors in the response
    const recommendedMentors = response.data;

    res.json(recommendedMentors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// // Recommendation Route
// router.post('/recommend', async (req, res) => {
//   try {
//     const { about, experience, education } = req.body;

//     // Assuming you have a User model to store these attributes, create a new User
//     const currentUser = new Atri({
//       about,
//       experience,
//       education,
//     });

//     // Save the current user to your database
//     await currentUser.save();

//     // Make a request to the Flask app with the user's attributes
//     const response = await axios.post('http://127.0.0.1:5000/recommend', {
//       mentee_input: {
//         about: currentUser.about,
//         experience: currentUser.experience,
//         education: currentUser.education,
//       },
//     });

//     // Assuming Flask returns recommended mentors in the response
//     const recommendedMentors = response.data;

//     res.json(recommendedMentors);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a user by ID
router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          username: req.body.username,
          accountType: req.body.accountType,
          about: req.body.about,
          experience: req.body.experience,
          education: req.body.education,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

