const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config(); // To load MongoDB URL from .env

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Import User Model
const User = require('./models/user');
const Task = require('./models/task'); // Import Task Model
const Message = require('./models/message'); // Import Message Model

app.post('/create-task', async (req, res) => {
  try {
    const { title, description, requestor, payment } = req.body;

    if (!title || !description || !requestor) {
      return res.status(400).json({ error: "Title, description, and requestor are required" });
    }

    const newTask = new Task({ title, description, requestor, payment });
    await newTask.save();

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error("Task Creation Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// User Registration Route
app.post('/register', async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging: Show request data

    const { name, email, password, role } = req.body;

    // Ensure all fields are provided
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields (name, email, password, role) are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Create and save the new user
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Task Confirmation Route
app.put('/confirm-task/:taskId', async (req, res) => {
  try {
    const { userId } = req.body; // Requestor's ID
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });

    // Ensure only the requestor can confirm the task
    if (task.requestor.toString() !== userId) {
      return res.status(403).json({ error: "You are not authorized to confirm this task" });
    }

    // Update task status to completed
    task.status = 'completed';
    await task.save();

    res.status(200).json({ message: "Task marked as completed", task });
  } catch (error) {
    console.error("Task Confirmation Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Send Message Route
app.post('/send-message', async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;

    if (!sender || !receiver || !content) {
      return res.status(400).json({ error: "Sender, receiver, and content are required" });
    }

    const newMessage = new Message({ sender, receiver, content });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent', newMessage });
  } catch (error) {
    console.error("Message Sending Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/get-messages/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Retrieve messages where the user is the receiver
    const messages = await Message.find({ receiver: userId })
      .populate('sender', 'name email') // Populate sender details
      .sort({ timestamp: -1 }); // Sort by newest first

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Message Retrieval Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const Earnings = require('./models/earnings'); // Import Earnings Model

app.post('/update-earnings', async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ error: "User ID and amount are required" });
    }

    let earnings = await Earnings.findOne({ user: userId });

    // If user doesn't have an earnings record, create one
    if (!earnings) {
      earnings = new Earnings({ user: userId, totalEarned: amount, transactions: [{ amount }] });
    } else {
      // Update existing earnings
      earnings.totalEarned += amount;
      earnings.transactions.push({ amount });
    }

    await earnings.save();

    res.status(200).json({ message: "Earnings updated successfully", earnings });
  } catch (error) {
    console.error("Earnings Update Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

module.exports = app;


