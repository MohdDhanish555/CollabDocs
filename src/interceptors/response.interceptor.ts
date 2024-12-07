import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ResponseMessageKey } from "src/decorators/responseMessage.decorator";
import { messages } from "src/utils/messages";

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const responseMessageKey: any = this.reflector.get<string>(
      ResponseMessageKey,
      context.getHandler()
    );

    const responseMessage =
      this.getNestedValue(messages, responseMessageKey) || responseMessageKey;

    return next.handle().pipe(
      map((data) => ({
        data: data,
        message: responseMessage || "",
      }))
    );
  }

  private getNestedValue(obj: any, path: string): any {
    return path?.split(".").reduce((prev, curr) => prev && prev[curr], obj);
  }
}
