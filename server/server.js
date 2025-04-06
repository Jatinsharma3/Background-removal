import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4000; 

// Initialize Express App
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to Database
(async () => {
    try {
        await connectDB();
    } catch (error) {
        console.error("Database Connection Failed:", error);
        process.exit(1); // Stop the server if DB fails
    }
})();

// API Routes
app.get('/', (req, res) => res.send("API Working"));
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter); // Assuming you have an imageRouter

// Start Server ONLY in local/dev (not for Vercel)
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// Export app for Vercel (No `app.listen()`)
export default app;
