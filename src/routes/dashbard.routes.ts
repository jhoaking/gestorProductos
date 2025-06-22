import { Router } from "express";
export const routerDashboard = Router();

routerDashboard.get("/", (_req, res) => {
  res.json({
    message: "Bienvenido a tu dashboard"
  });
});
