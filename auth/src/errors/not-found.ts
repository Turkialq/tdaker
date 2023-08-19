import { CustomError } from "./custom-errors";

export class NotFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super("Route not found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeErros() {
    return [{ message: "Not found" }];
  }
}
