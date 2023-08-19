import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-errors";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ erros: err.serializeErros() });
  }

  return res
    .sendStatus(400)
    .send({ erros: [{ message: "something went wrong" }] });
}
