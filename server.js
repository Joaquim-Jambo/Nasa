import express from "express"
import { configDotenv } from "dotenv";
import routes from "./src/routes/exoplanetRoutes.js";

const app = express();

app.use("/api", routes)
configDotenv();

const port = process.env.PORT || 8080

app.listen(port, ()=>
    console.log(`Server listening on localhost:${port}`)
)