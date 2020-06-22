import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    constructor(public  auth: AuthService, private  router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('interceptor running');
        // Récupérer le jeton du service d'authentification
        const authToken = this.auth.getToken();

        if (authToken) {
            // Clone la requête et ajouter un élément dans l'en-tête.
            const authReq = req.clone(
                {headers: req.headers.set('Authorization', `Bearer ${authToken}`)}
            );
            console.log('interceptor running with new headers');

            // Envoyer la nouvelle requête
            return next.handle(authReq).pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // Response wiht HttpResponse type
                        console.log('TAP function', event);

                    }
                }, (err: any) => {
                    console.log(err);
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            localStorage.removeItem('token');
                            this.router.navigate(['/']);
                        }
                    }
                })
            );

        } else {
            console.log('interceptor without changes');
            return next.handle(req);
        }
    }
}
