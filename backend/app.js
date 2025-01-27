import express from "express";
import cors from "cors";
import authRoute from './routes/authRoutes.js';
import boardRoute from './routes/boardRoutes.js';
import userRoute from './routes/userRoutes.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use('/api/v1/auth',authRoute );
app.use('/api/v1/board',boardRoute);
app.use('/api/v1/user',userRoute);



export default app;
