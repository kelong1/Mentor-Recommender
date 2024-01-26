const express = require('express');
const router = express.Router();
const MentorshipRequest = require('../models/mentorshipRequest');

// Endpoint to send mentorship request
router.post('/send-request', async (req, res) => {
  try {
    const { menteeId, mentorId } = req.body;

    // Check if the mentorship request already exists
    const existingRequest = await MentorshipRequest.findOne({ menteeId, mentorId });
    if (existingRequest) {
      return res.status(400).json({ error: 'Mentorship request already sent.' });
    }

    // Create a new mentorship request
    const mentorshipRequest = new MentorshipRequest({ menteeId, mentorId });
    await mentorshipRequest.save();

    return res.status(201).json({ message: 'Mentorship request sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get mentorship requests for a specific user
router.get('/get-requests/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve mentorship requests where the user is either the mentee or mentor
    const mentorshipRequests = await MentorshipRequest.find({
      $or: [{ menteeId: userId }, { mentorId: userId }],
    })
      .populate('menteeId', 'username') // Populate user details for mentee
      .populate('mentorId', 'username'); // Populate user details for mentor

    res.json({ mentorshipRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to accept or reject mentorship request
router.post('/respond-request', async (req, res) => {
  try {
    const { requestId, response } = req.body;

    // Validate the response value
    if (!['accepted', 'rejected'].includes(response)) {
      return res.status(400).json({ error: 'Invalid response value.' });
    }

    // Update the status of the mentorship request
    await MentorshipRequest.findByIdAndUpdate(requestId, { status: response });

    res.json({ message: 'Mentorship request responded successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
