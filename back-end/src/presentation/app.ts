import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errHandler";
import router from "../infra/routes/route";
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(`/api`, router);
app.use(errorHandler);
export default app.listen(Number(process.env.SERVER_PORT) as number, () =>
  console.log(` ... Server started on port ${process.env.SERVER_PORT} ... `)
);
