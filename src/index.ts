import express, { json } from 'express';
import dotenv from "dotenv";
import { routes } from './routes';

dotenv.config();

const app = express();

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});


app.use(json());
app.use('/api', routes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
