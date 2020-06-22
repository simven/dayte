import {catchError, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {Personne} from '@src/app/personne';
import {HandleError, HttpErrorHandlerService} from '../shared/http-error-handler.service';


// Setup headers
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidG9kb191c2VyIn0.Uk72lYtm2kf2GtKog1ONq5EYQcvmgOT-ltbJqOUbeVk'
    })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public currentUser: Personne;
    private readonly apiUrl = environment.apiUrl;
    private registerUrl = this.apiUrl;
    private loginUrl = this.apiUrl;
    private handleError: HandleError;

    constructor(private  http: HttpClient, private errorHandler: HttpErrorHandlerService, private  router: Router) {
        this.handleError = errorHandler.createHandleError('Service Authentification');

    }

    onRegister(user: Personne): Observable<{} | Personne> {
        const request = JSON.stringify(
            {
                mail: user.mail, password: user.password
            }
        );
        return this.http.post(this.registerUrl, request, httpOptions)
            .pipe(
                map((response: Personne) => {
                    // Receive jwt token in the response
                    const token: string =
                        response['access_token'];
                    // If we have a token, proceed
                    if (token) {
                        this.setToken(token);
                        this.getUser().subscribe();
                    }
                    return response;
                }),
                catchError(this.handleError('onRegister', {}))
            );
    }

    onLogin(user: Personne): Observable<{} | Personne> {
        return this.http.get(this.loginUrl, httpOptions)
            .pipe(
                map((response: Personne) => {
                    // Receive jwt token in the response
                    const token: string =
                        response['access_token'];
                    // If we have a token, proceed
                    if (token) {
                        this.setToken(token);
                        this.getUser().subscribe();
                    }
                    return response;
                }),
                catchError(this.handleError('onLogin', {}))
            );
    }

    onLogout(): Observable<any> {
        return this.http.post(this.apiUrl + 'logout', httpOptions)
            .pipe(
                tap(() => {
                    console.log('remove token');
                    localStorage.removeItem('token');
                    this.router.navigate(['/']);
                }));
    }

    setToken(token: string): void {
        return localStorage.setItem('token', token);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    getUser(): Observable<Personne> {
        return this.http.get(this.apiUrl + 'me').pipe(
            tap((user: Personne) => {
                this.currentUser = user;
            })
        );
    }

    isAuthenticated(): boolean {
        // get the token
        const token: string = this.getToken();
        if (token) {
            return true;
        }
        return false;
    }

}
