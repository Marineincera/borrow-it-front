import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "../shared/services/user.service";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("TOKEN");

    if (!token) {
      return next.handle(req);
    }
    console.log(token);

    const headers = req.headers.set("Authorization", `Bearer ${token}`);
    const authReq = req.clone({ headers });

    return next.handle(authReq);
  }
}
