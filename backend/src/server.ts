import express from "express";
import "reflect-metadata";
import { createConnection } from 'typeorm';
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./service";
import { sqliteOrmConfig } from './config/ormconfig'


process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

createConnection(sqliteOrmConfig).then(async connection => {

  const app = express();
  applyMiddleware(middleware, app);
  applyRoutes(routes, app);
  applyMiddleware(errorHandlers, app);

  const { PORT = 3000 } = process.env;
  app.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}...`)
  );

}).catch(console.log)