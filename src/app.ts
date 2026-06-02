import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { initPackages } from "./common/init";
import router from "./services/campaign/domain/campaignRouter";
import requestLogger from "./common/middlewares/loggerMiddleware";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);
app.use(`/campaigns`, router);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Hello World",
  });
});

initPackages().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});
