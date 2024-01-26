const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentorModel'); // Update the path accordingly
const jwt = require('jsonwebtoken');
const {loginUser}=require("../Controllers/mentorControllers")

router.post("/loginn",loginUser)
// Route to get all mentors
router.post('/mentors', async (req, res) => {
  try {
    const newMentor = new Mentor(req.body);
    const savedMentor = await newMentor.save();
    res.status(201).json(savedMentor);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Login route for mentors
router.post('/login', async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the mentor with the provided name exists
    const mentor = await Mentor.findOne({ name });

    if (!mentor) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a JSON Web Token (JWT) for the logged-in mentor
    const token = jwt.sign({ mentorId: mentor._id }, 'your_secret_key', {
      expiresIn: '1h', // Adjust the expiration time as needed
    });

    res.json({ token, mentor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Login route for mentors
router.post('/getMentor', async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the mentor with the provided name exists
    const mentor = await Mentor.findOne({ name });

    if (!mentor) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ mentor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/mentors', async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/mentors/:id', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).send('Mentor not found');
    }
    res.json(mentor);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/mentors/:id', async (req, res) => {
  try {
    const updatedMentor = await Mentor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMentor) {
      return res.status(404).send('Mentor not found');
    }
    res.json(updatedMentor);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/mentors/:id', async (req, res) => {
  try {
    const deletedMentor = await Mentor.findByIdAndDelete(req.params.id);
    if (!deletedMentor) {
      return res.status(404).send('Mentor not found');
    }
    res.json(deletedMentor);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.post("/test",async(req,res)=>{
console.log("i am connetcted")
})


module.exports = router;
