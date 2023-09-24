import express, { Application } from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";

import { errorHandler } from "@tdaker/common";
import { NotFoundError } from "@tdaker/common";

const app: Application = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({ signed: false, secure: true }));

app.get("/api/tickets", async (req, res, next) => {
  res.send("Hello World");
});

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
