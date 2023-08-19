import { CustomError } from "./custom-errors";

export class DatabaseConnectionError extends CustomError {
  reason = "Error connecting to database";
  statusCode = 500;

  constructor() {
    super("Error connection to DB ");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErros() {
    return [{ message: this.reason }];
  }
}
