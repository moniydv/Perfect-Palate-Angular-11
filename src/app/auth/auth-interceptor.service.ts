import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler){
    return this.authService.loggedInUser.pipe(take(1), exhaustMap(
      user => {
        if(!user) {
          return next.handle(req);
        }
        const newReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(newReq);
      }
    ));
     
  }

  constructor(private authService: AuthService) { }
}
