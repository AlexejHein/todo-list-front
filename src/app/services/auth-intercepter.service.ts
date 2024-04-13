import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthIntercepterService implements HttpInterceptor{

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token){
      req = req.clone({
        setHeaders: { Authorization: `Token ${token}`}
      });
      }
    return next.handle(req).pipe(
      catchError( (error: { status: number; }) => {
        if (error instanceof HttpErrorResponse){
          if (error.status === 401){
            this.router.navigate(['/login']).then(r => console.log(r));
          }
        }
        return throwError( () => error);
      })
    );
    }
}
