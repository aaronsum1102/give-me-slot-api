// setup server
import express from 'express';
import cors from 'cors';
import { version } from '../package.json';
import { schedulesRouter } from './controllers/scheduleController';
import { settingsRouter } from './controllers/settingsController';

const app = express();

app.use(express.json());
const allowedOrigins = ['http://localhost:8080'];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);
app.disable('x-powered-by');
const port = process.env.PORT || 4000;

// setup routes
app.get('/', (req, res) =>
  res.send(`GiveMeSlot api version: ${version} is running at port ${port}...`)
);
app.use('/schedules', schedulesRouter);
app.use('/settings', settingsRouter);

app.listen(port, () => console.log(`app listen at port ${port}...`));
