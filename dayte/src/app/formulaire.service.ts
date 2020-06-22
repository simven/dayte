import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {Formulaire} from '@src/app/formulaire';
import {FormulaireRedhi} from '@src/app/formulaireRedhi';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import {AttributRecherche} from '@src/app/attributRecherche';

@Injectable({
    providedIn: 'root'
})
export class FormulaireService {
    public url = 'http://localhost:3000/formulaire';
    public urlRedhi = 'http://localhost:3000/form_redhi';
    public urlAttribut = 'http://localhost:3000/attribut_recherche';
    public httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // tslint:disable-next-line:max-line-length
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidG9kb191c2VyIn0.Uk72lYtm2kf2GtKog1ONq5EYQcvmgOT-ltbJqOUbeVk'
        })
    };

    // this is values for id
    private cpt = 1;
    private cptRedhi = 1;
    private cptAttribut = 1;

    constructor(private http: HttpClient) {
    }

    // get all forms
    getFormulaires(): Observable<Formulaire[]> {
        return this.http.get<Formulaire[]>(this.url);
    }

    // get all forms redhi
    getFormulairesRedhi(): Observable<FormulaireRedhi[]> {
        return this.http.get<FormulaireRedhi[]>(this.urlRedhi);
    }

    // get all attribute search
    getAttributs(): Observable<AttributRecherche[]> {
        return this.http.get<AttributRecherche[]>(this.urlAttribut);
    }

    // get one form
    getFormulaire(formulaire: Formulaire): Observable<Formulaire> {
        return this.http.get<Formulaire>(this.url + '?id=eq.' + formulaire.id_formulaire);
    }

    // get one form redhi
    getFormulaireRedhi(formulaireRedhi: FormulaireRedhi): Observable<FormulaireRedhi> {
        return this.http.get<FormulaireRedhi>(this.urlRedhi + '?id=eq.' + formulaireRedhi.id_formulaire);
    }

    // get one attribute recherche
    getAttribut(attribut: AttributRecherche): Observable<AttributRecherche> {
        return this.http.get<AttributRecherche>(this.urlAttribut + '?id=eq.' + attribut.id_attribut);
    }

    // post in form
    addReponse(personne: number, question: number, reponse: number) {
        const formulaire = {
            id_formulaire: this.cpt,
            id_personne: personne,
            id_question: question,
            id_reponse: reponse
        };
        this.http.post<Formulaire>(this.url, formulaire, this.httpOption).subscribe(data => {
            console.log(data);
            formulaire.id_formulaire = data.id_formulaire;
        });

        this.cpt++;
    }

    // post in form redhi
    addReponseRedhi(personne: number, question: number, reponse: number) {
        const formulaire = {
            id_formulaire: this.cptRedhi,
            id_personne: personne,
            id_question: question,
            id_reponse: reponse
        };
        this.http.post<FormulaireRedhi>(this.urlRedhi, formulaire, this.httpOption).subscribe(data => {
            console.log(data);
            formulaire.id_formulaire = data.id_formulaire;
        });

        this.cptRedhi++;
    }

    // post in attribute
    addAttribut(id_personne: number, age_min: number, age_max: number, taille_min: number, taille_max: number) {
        const attributRecherche = {
            id_attribut: this.cptAttribut,
            id_personne: id_personne,
            age_min: age_min,
            age_max: age_max,
            taille_min: taille_min,
            taille_max: taille_max
        };
        this.http.post<AttributRecherche>(this.urlAttribut, attributRecherche, this.httpOption).subscribe(data => {
            console.log(data);
            attributRecherche.id_attribut = data.id_attribut;
        });

        this.cptAttribut++;
    }

    updateFormulaire (formulaire: Formulaire) {
        return this.http.patch(this.url + '?id=eq.' + formulaire.id_personne, formulaire, this.httpOption);
    }

    deleteFormulaire (formulaire: Formulaire): Observable<Object> {
        return this.http.delete<Object>(this.url + '?id=eq.' + formulaire.id_personne, this.httpOption);
    }
}
