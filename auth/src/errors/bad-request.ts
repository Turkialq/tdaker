import { CustomError } from "./custom-errors";

export class BadRequest extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequest.prototype);
  }

  serializeErros() {
    return [{ message: this.message }];
  }
}
