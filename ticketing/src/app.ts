import express, { Application } from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@tdaker/common";

import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes/index";
import { updateTicketRouter } from "./routes/update";

const app: Application = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({ signed: false, secure: true }));

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async (req, res, next) => {
  console.log(req.url);
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
