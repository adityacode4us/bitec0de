class CustomErrorHandler extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;

    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, CustomErrorHandler.prototype);
  }

  static alreadyExist(message: string): CustomErrorHandler {
    return new CustomErrorHandler(409, message);
  }

  static credentials(
    message: string = "username or password is invalid"
  ): CustomErrorHandler {
    return new CustomErrorHandler(401, message);
  }
}

export default CustomErrorHandler;
