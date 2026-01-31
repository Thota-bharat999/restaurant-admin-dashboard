import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { errorMiddlware } from "./middlewares/errorMiddleware.js";
import menuRoutes from "./routes/menuRoutes.js";


const app = express();

// middleware
app.use(cors());
app.use(express.json());


// routes
app.get("/", (req, res) => {
  res.send("Restaurant Admin API is running");
});
app.use("/api/menu",menuRoutes)
app.use(errorMiddlware);

// start server
const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

startServer();
