// setup server
import express from 'express';
import cors from 'cors';
import * as config from './package.json';
import { schedulesRouter } from './src/controllers/scheduleController';
import { settingsRouter } from './src/controllers/settingsController';

const app = express();

app.use(express.json());
var allowedOrigins = [
  'http://localhost:8080',
  'https://give-me-slot.herokuapp.com',
];
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("origin check", origin);
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.disable('x-powered-by');
const port = process.env.PORT || 4000;
const version = config.version;

// setup routes
app.get('/', (req, res) =>
  res.send(`GiveMeSlot api version: ${version} is running at port ${port}...`)
);
app.use('/schedules', schedulesRouter);
app.use('/settings', settingsRouter);

app.listen(port, () => console.log(`app listen at port ${port}...`));
