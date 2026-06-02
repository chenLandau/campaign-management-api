import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { initPackages } from "./common/init";
import router, {
  prefix,
} from "./services/campaign/infrastructure/campaignRouter";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(`/${prefix}`, router);

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
