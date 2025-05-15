import { Router } from "express";
import { studentRoutes } from "./studentRoutes/students.routes";
import { accommodationRoutes } from "./accommodationRoutes/accommodation.routes";
import { eventRoutes } from "./eventRoutes/event.routes";
import { emergencyServiceRoutes } from "./emergencyServiceRoutes/emergencyService.routes";
import { feedbackRoutes } from "./feedbackRoutes/feedback.routes";
import { translationRoutes } from "./translationRoutes/translation.routes";


export const routes = Router();

routes.use("/students", studentRoutes);
routes.use("/accommodations", accommodationRoutes);
routes.use("/events", eventRoutes);
routes.use("/emergency-services", emergencyServiceRoutes);
routes.use("/feedbacks", feedbackRoutes);
routes.use("/translations", translationRoutes);
