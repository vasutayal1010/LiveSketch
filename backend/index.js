import dotenv from "dotenv";
import connectDB from "./db/db.js";
import app from "./app.js";
import http from "http";
import { initSocket } from "./socketHandlers/socketHandler.js";




dotenv.config();
connectDB();

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

setTimeout(() => {
  initSocket(server); // Initialize socket.io
}, 1000);


server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
