// import 'dotenv/config'
// import express from 'express'
// import cors from 'cors'
// import connectDB from './configs/mongodb.js'

// // App config
// const PORT = process.env.port || 4000
// const app = express()
// await connectDB()



// // Initialize Middlewares
// app.use(express.json())
// app.use(cors())

// // api routes
// app.get('/',(req,res)=> res.send("API Working"))

// app.listen(PORT, ()=> console.log("Server Running on port" + PORT))



import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

// Connect to Database
(async () => {
    try {
        await connectDB();
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
})();

const PORT = process.env.port || 4000

// Initialize Express App
const app = express();
app.use(express.json());
app.use(cors());

// API Route
app.get('/', (req, res) => res.send("API Working"));
app.use('/app/user', userRouter)

app.listen(PORT, ()=> console.log("Server Running on port" + PORT))

// Export for Vercel (NO app.listen)
export default app;
