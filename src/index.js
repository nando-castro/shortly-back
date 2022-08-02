import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/usersRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(usersRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is litening on port ${PORT}`);
});
