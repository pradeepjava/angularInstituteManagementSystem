import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TOKEN } from '../constentProvider';

@Injectable({
  providedIn: 'root'
})
export class MyhttpintereptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = localStorage.getItem(TOKEN);
    if (token == null) {
      token = ''
    }
    req = req.clone({
      setHeaders: {
        Authorization: token
      }
    })
    return next.handle(req);
  }
}
