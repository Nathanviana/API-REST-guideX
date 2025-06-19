"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoutes = void 0;
// src/routes/dashboard.routes.ts
const express_1 = require("express");
const dashboard_controller_1 = require("../../controllers/dashboard.controller");
const prisma_factory_1 = require("../../factories/prisma.factory");
exports.dashboardRoutes = (0, express_1.Router)();
const controller = new dashboard_controller_1.DashboardController(prisma_factory_1.prisma);
exports.dashboardRoutes.get("/summary", controller.summary.bind(controller));
exports.dashboardRoutes.get("/recent-activities", controller.recentActivities.bind(controller));
