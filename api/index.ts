import express from 'express';
import cors from 'cors';

import { version } from '../package.json';
import { schedulesRouter } from '../src/controllers/scheduleController';
import { settingsRouter } from '../src/controllers/settingsController';

const app = express();

app.use(express.json());

const allowedOrigins = ['give-me-slot.vercel.app', 'give-me-slot-api-sumsx03.vercel.app'];
process.env.IS_LOCAL && allowedOrigins.push('localhost');

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
app.get('/', (_, res) => res.send(`GiveMeSlot api version: ${version} is running...`));
app.use('/schedules', schedulesRouter);
app.use('/settings', settingsRouter);

app.listen(port, () => console.log(`app listen at port ${port}...`));

export default app;
