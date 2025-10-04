import { Router } from "express";
import { getAllExoplanets, getExoplanetsByDisposition, getExoplanetsWithLimits } from "../controllers/exoplanetController.js";


const routes = Router();

routes.get('/exoplanets/', getAllExoplanets);
routes.get('/exoplanets/limit/:limit', getExoplanetsWithLimits);
routes.get('/exoplanets/disposition/:type', getExoplanetsByDisposition)

export default routes