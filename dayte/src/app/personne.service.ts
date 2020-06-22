import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {Personne} from '@src/app/personne';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PersonneService {
    public url = 'http://localhost:3000/personne';
    public httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // tslint:disable-next-line:max-line-length
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidG9kb191c2VyIn0.Uk72lYtm2kf2GtKog1ONq5EYQcvmgOT-ltbJqOUbeVk'
        })
    };
    cpt = 5;

    constructor(private http: HttpClient) {
    }

    getPersonnes(): Observable<Personne[]> {
        return this.http.get<Personne[]>(this.url);
    }

    getPersonne(personne: Personne): Observable<Personne> {
        return this.http.get<Personne>(this.url + '?id=eq.' + personne.id_personne);
    }

    addPersonne(nom: string, prenom: string, tel: number, ville: string, code_postal: number) {
        const personne = {
            id_personne: this.cpt,
            nom: nom,
            prenom: prenom,
            mail: null,
            password: null,
            tel: tel,
            taille: null,
            sexe: null,
            sexe_rechercher: null,
            n_rue: null,
            adresse1: ville,
            adresse2: null,
            code_postale: code_postal,
            ville_id: null,
        };
        this.cpt++;
        return this.http.post<Personne>(this.url, personne, this.httpOption).subscribe(data => {
            personne.id_personne = data.id_personne;
        });
    }

    updatePersonne (personne: Personne) {
        return this.http.patch(this.url + '?id=eq.' + personne.id_personne, personne, this.httpOption);
    }

    deletePersonne (personne: Personne): Observable<Object> {
        return this.http.delete<Object>(this.url + '?id=eq.' + personne.id_personne, this.httpOption);
    }
}
