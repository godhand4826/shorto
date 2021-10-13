import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const res = ctx.getResponse();
    const status = exception.getStatus();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.path,
    };
    const dataString = JSON.stringify(errorResponse);
    Logger.error(
      `${request.method} ${request.url} ${HttpStatus.NOT_FOUND} - ?ms ${dataString}`,
      HttpExceptionFilter.name,
    );
    res.status(HttpStatus.NOT_FOUND).json(errorResponse);
  }
}
