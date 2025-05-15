import express, { Request, Response } from 'express';
import studentRoutes from './src/routes/studentRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(studentRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
