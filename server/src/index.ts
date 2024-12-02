import express from 'express';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
import connectDB from './db';
import cors from "cors";



connectDB(); 

dotenv.config();

const app = express();
const PORT = process.env.PORT ||  3000;

connectDB();
app.use(cors());
app.use(express.json()); 

app.use('/api/v1', userRoutes);



app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
