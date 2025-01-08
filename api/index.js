import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    console.error('Full Error:', error);
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);