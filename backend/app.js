import express from "express";
import cors from "cors";
import authRoute from './routes/authRoutes.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use('/api/v1/auth',authRoute );



export default app;
