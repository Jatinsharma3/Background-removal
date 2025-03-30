
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

const PORT = process.env.port || 4000

// Connect to Database
await connectDB()

// Initialize Express App
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// API Route
app.get('/', (req, res) => res.send("API Working"));
app.use('/api/user', userRouter)

app.listen(PORT, ()=> console.log("Server Running on port" + PORT))

// Export for Vercel (NO app.listen)
export default app;
