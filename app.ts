// setup server
import express from "express";
import * as config from "./package.json";
import { schedulesRouter } from "./src/controllers/scheduleController";

const app = express();
app.use(express.json());
app.disable("x-powered-by");
const port = process.env.PORT || 4000;
const version = config.version;

// setup routes
app.get("/", (req, res) =>
  res.send(`GiveMeSlot api version: ${version} is running at port ${port}...`)
);
app.use("/schedules", schedulesRouter);

app.listen(port, () => console.log(`app listen at port ${port}...`));
