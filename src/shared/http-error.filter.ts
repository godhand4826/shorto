import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const [request, response] = [ctx.getRequest(), ctx.getResponse()];
    const [status, res] = [exception.getStatus(), exception.getResponse()];

    const errorResponse = {
      path: request.path,
      statusCode: exception.getStatus(),
      message: typeof res === 'string' ? res : (res as any).message,
      error: typeof res === 'string' ? res : (res as any).error,
      timestamp: new Date().toISOString(),
    };

    Logger.error(
      `${request.method} ${request.url} ${status} - ?ms ${JSON.stringify(
        errorResponse,
      )}`,
      HttpExceptionFilter.name,
    );
    response.status(status).json(errorResponse);
  }
}
