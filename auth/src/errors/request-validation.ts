import { ValidationError } from "express-validator";
import { CustomError } from "./custom-errors";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid input params");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErros() {
    return this.errors.map((err) => {
      if (err.type === "field") {
        return { message: err.msg, field: err.path };
      } else {
        return { message: err.msg };
      }
    });
  }
}
