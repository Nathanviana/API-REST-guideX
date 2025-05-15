import { Router } from "express";
import { studentRoutes } from "./studentRoutes/students.routes";

export const routes = Router();

routes.use("/students", studentRoutes);