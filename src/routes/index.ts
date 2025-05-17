import { Router } from "express";
// import { studentRoutes } from "./studentRoutes/students.routes";
import { accommodationRoutes } from "./accommodationRoutes/accommodation.routes";
import { eventRoutes } from "./eventRoutes/event.routes";
import { emergencyServiceRoutes } from "./emergencyServiceRoutes/emergencyService.routes";
import { feedbackRoutes } from "./feedbackRoutes/feedback.routes";
import { translationRoutes } from "./translationRoutes/translation.routes";
import { userRoutes } from "./userRoutes/user.routes";
import { authRoutes } from "./authRoutes/auth.routes";
import { authenticateToken } from "../middlewares/auth.middleware";


export const routes = Router();

// routes.use("/students", studentRoutes);
routes.use("/accommodations", authenticateToken, accommodationRoutes);
routes.use("/events", authenticateToken, eventRoutes);
routes.use("/emergency-services", authenticateToken, emergencyServiceRoutes);
routes.use("/feedbacks", authenticateToken, feedbackRoutes);
routes.use("/translations", authenticateToken, translationRoutes);
routes.use("/users", authenticateToken, userRoutes);
routes.use("/auth",  authRoutes);
