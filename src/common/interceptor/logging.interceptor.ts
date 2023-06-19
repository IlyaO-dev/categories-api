import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const now = Date.now();
    const ctx = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap(() => {
        this.logger.debug(
          `[${ctx.req.method}] ${ctx.statusCode} : ${ctx.req.url} - ${
            Date.now() - now
          }ms`,
        );
      }),
      catchError((err) => {
        this.logger.error(
          `[${ctx.req.method}] ${err.status}: ${ctx.req.url} - ${
            Date.now() - now
          }ms`,
          err.stack,
        );

        return throwError(err);
      }),
    );
  }
}
