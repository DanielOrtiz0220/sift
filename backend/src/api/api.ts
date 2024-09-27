import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { searchHandler } from "./utils/searchHandlerUtil";
import { authStatusHandler, authRefreshHandler } from "./utils/authHandlersUtil";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/search/:query", searchHandler);
app.get("/auth/status", authStatusHandler);
app.post("/auth/refresh", authRefreshHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;