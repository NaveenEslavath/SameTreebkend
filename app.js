const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const sequelize = require('./config/database');
const User = require('./models/User');
const Address = require('./models/Address');

const app = express();
app.use(cors()); // Use CORS middleware
app.use(bodyParser.json());

// Sync the database and models without dropping existing tables
sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

// Route for user registration and address submission
app.post('/register', async (req, res) => {
  const { name, street, city, country } = req.body;

  try {
    const user = await User.create({ name });
    const address = await Address.create({ street, city, country, UserId: user.id });
    res.json({ message: 'User and address saved successfully', user, address });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save user and address' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});