import cors from "cors";
import express from "express";
import {MongoConnect} from "./config/mongodb.js";
import routes from "./routes/index.js";
import config from "config";
import bodyParser from "body-parser";

const app = express();
const PORT = config.get("port");

app.use(bodyParser.json({ limit: "50mb" }));

app.use(express.json());

app.use(cors());
MongoConnect();

routes(app);

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
});