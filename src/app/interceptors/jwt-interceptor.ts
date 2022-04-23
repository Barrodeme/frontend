import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from '../services/keycloak.service';

@Injectable()
export class JwtInterceptors implements HttpInterceptor {
  constructor(private kcService: KeycloakService){}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.kcService.kc.authenticated) {
       return next.handle(httpRequest )
    }
    let request= httpRequest.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.kcService.kc.token
      }
    });

    return next.handle(request)

  }
}
