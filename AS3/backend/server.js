require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const { authMiddleware } = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());
app.use(authMiddleware); //app ID OIDC for backend

//connecting to mongodb
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//routes
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});