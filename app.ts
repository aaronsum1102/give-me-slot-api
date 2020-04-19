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
app.use("/settings", (req, res) => {
  res.status(200).json({
    vendors: {
      NTUC : {
        id: "NTUC",
        name: "Fairprice",
        link: "https://www.fairprice.com.sg/cart",
      },
      ShengSiong: {
        id: "ShengSiong",
        name: "Sheng Siong",
        link: "https://www.allforyou.sg/cart"
      }
    },
    queryStatus: {
      NTUC : {
        isLoading: false,
        startDateTime: null,
        endDateTime: null,
      },
      ShengSiong : {
        isLoading: false,
        startDateTime: null,
        endDateTime: null
      }
    }
  });
})

app.listen(port, () => console.log(`app listen at port ${port}...`));
