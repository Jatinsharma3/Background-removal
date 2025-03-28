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

// Connect to Database
(async () => {
    await connectDB();
})();

// Initialize Express App
const app = express();
app.use(express.json());
app.use(cors());

// API Route
app.get('/', (req, res) => res.send("API Working"));

// Export for Vercel (NO app.listen)
export default app;
