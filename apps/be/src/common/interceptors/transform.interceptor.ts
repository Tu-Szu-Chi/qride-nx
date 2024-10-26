import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { camelCase, snakeCase, isObject } from 'lodash';
import { Logger } from '@nestjs/common';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TransformInterceptor.name);

  private transformToSnakeCase(obj: unknown): unknown {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.transformToSnakeCase(item));
    } else if (isObject(obj) && !(obj instanceof Date)) {
      return Object.keys(obj).reduce((acc, key) => {
        acc[snakeCase(key)] = this.transformToSnakeCase(obj[key]);
        return acc;
      }, {});
    }
    return obj;
  }

  private transformToCamelCase(obj: unknown): unknown {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.transformToCamelCase(item));
    } else if (isObject(obj) && !(obj instanceof Date)) {
      return Object.keys(obj).reduce((acc, key) => {
        acc[camelCase(key)] = this.transformToCamelCase(obj[key]);
        return acc;
      }, {});
    }
    return obj;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    if (request.body) {
      // const originalBody = JSON.stringify(request.body);
      request.body = this.transformToSnakeCase(request.body);
      // this.logger.debug(
      //   `Transformed request body from ${originalBody} to ${JSON.stringify(
      //     request.body
      //   )}`
      // );
    }

    return next.handle().pipe(
      map((data) => {
        const transformed = this.transformToCamelCase(data);
        // this.logger.debug(
        //   `Transformed response from ${JSON.stringify(
        //     data
        //   )} to ${JSON.stringify(transformed)}`
        // );
        return transformed;
      })
    );
  }
}
