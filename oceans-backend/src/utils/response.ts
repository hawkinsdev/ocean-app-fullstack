import { Response } from "express";

export class ResponseHelper {
  private static _sendResponse(
    res: Response,
    statusCode: number,
    status: "success" | "error",
    message: string,
    data: unknown = null,
    error: unknown = null
  ) {
    return res.status(statusCode).json({
      status,
      message,
      data,
      error: error || false,
    });
  }

  static success<T>(res: Response, data: T, message = "Success") {
    return this._sendResponse(res, 200, "success", message, data);
  }

  static created<T>(res: Response, data: T, message = "Resource created") {
    return this._sendResponse(res, 201, "success", message, data);
  }

  static badRequest(res: Response, error: unknown, message = "Bad Request") {
    return this._sendResponse(res, 400, "error", message, null, error);
  }

  static unauthorized(res: Response, message = "Unauthorized") {
    return this._sendResponse(res, 401, "error", message);
  }

  static forbidden(res: Response, message = "Forbidden") {
    return this._sendResponse(res, 403, "error", message);
  }

  static notFound(res: Response, message = "Resource not found") {
    return this._sendResponse(res, 404, "error", message);
  }

  static internalServerError(
    res: Response,
    error: unknown,
    message = "Internal Server Error"
  ) {
    return this._sendResponse(res, 500, "error", message, null, error);
  }

  static handleError(res: Response, error: any) {
    switch (error.name) {
      case "NotFoundError":
        return this.notFound(res, error.message);
      case "ValidationError":
        return this.badRequest(res, error, error.message);
      case "UnauthorizedError":
        return this.unauthorized(res, error.message);
      case "ForbiddenError":
        return this.forbidden(res, error.message);
      default:
        return this.internalServerError(
          res,
          error,
          error.message || "Unexpected error"
        );
    }
  }
}
