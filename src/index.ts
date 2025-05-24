import express, { json } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { routes } from './routes';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // Altere para a URL onde seu frontend está sendo servido
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Permite enviar cookies com as requisições
};

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(json());
app.use('/api', routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});
