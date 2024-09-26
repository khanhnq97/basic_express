class Response {
  constructor(message, status, errorType, data) {
    this.message = message;
    this.status = status;
    this.errorType = errorType;
    this.data = data;
  }

  static success(message, data = null) {
    return new Response(message, 200, null, data);
  }

  static createSuccess(message, data = null) {
    return new Response(message, 201, null, data);
  }

  static error(
    message,
    status = 500,
    errorType = "InternalServerError",
    data = null,
  ) {
    return new Response(message, status, errorType, data);
  }

  toJSON() {
    return {
      message: this.message,
      status: this.status,
      errorType: this.errorType,
      data: this.data,
    };
  }
}

export default Response;
