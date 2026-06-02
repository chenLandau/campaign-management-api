import express from "express";
import router from "./services/campaign/domain/campaignRouter";
import requestLogger from "./common/middlewares/loggerMiddleware";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use(`/campaigns`, router);

export { app };
