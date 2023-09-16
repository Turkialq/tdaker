import { CustomError } from "./custom-errors";

export class NotAuthorizedError extends CustomError {
  serializeErros(): { message: string; field?: string | undefined }[] {
    return [{ message: "Not authorized" }];
  }
  statusCode = 401;

  constructor() {
    super("Not authorized");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
}
