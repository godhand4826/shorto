import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const startAt = Date.now();

    return next.handle().pipe(
      tap(data => {
        const elapsed = Date.now() - startAt;
        const dataString = JSON.stringify(data);
        Logger.log(
          `${request.method} ${request.url} ${response.statusCode} - ${elapsed}ms ${dataString}`,
          context.getClass().name,
        );
      }),
    );
  }
}
