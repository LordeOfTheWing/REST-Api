import express from "express";
import config from "config";
import helmet from "helmet";
import log from "./utils/logger";
import connect from "./utils/connect";
import routes from "./routes";
import deserializeUser from "./middlewares/deserializeUser";

const port = config.get("port") as number;
const host = config.get("host") as string;

export const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);

app.listen(port, async () => {
  log.info(`Server is listening at http://${host}:${port}`);
  await connect();
  routes(app);
});
