import { Router } from "express";
import { studentRoutes } from "./studentRoutes/students.routes";
import { accommodationRoutes } from "./accommodationRoutes/accommodation.routes";
import { eventRoutes } from "./eventRoutes/event.routes";


export const routes = Router();

routes.use("/students", studentRoutes);
routes.use("/accommodations", accommodationRoutes);
routes.use("/events", eventRoutes);
