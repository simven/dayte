import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {Question} from '@src/app/question';
import {Reponse} from '@src/app/reponse';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class QuestionReponseService {
    public urlQuestion = 'http://localhost:3000/question';
    public urlReponse = 'http://localhost:3000/reponse';
    public httpOption = {
        headers: new HttpHeaders({'Content-Type': 'application.json'})
    };

    constructor(private http: HttpClient) {
    }

    getQuestions(): Observable<Question[]> {
        return this.http.get<Question[]>(this.urlQuestion);
    }

    getReponses(): Observable<Reponse[]> {
        return this.http.get<Reponse[]>(this.urlReponse);
    }

    getQuestion(question: Question): Observable<Question> {
        return this.http.get<Question>(this.urlQuestion + '?id=eq.' + question.id_question);
    }

    getReponse(reponse: Reponse): Observable<Reponse> {
        return this.http.get<Reponse>(this.urlReponse + '?id=eq.' + reponse.id_reponse);
    }

    addQuestion(questionLibelle: string): Observable<Question> {
        const question = {
            libelle: questionLibelle
        };
        return this.http.post<Question>(this.urlQuestion, question, this.httpOption);
    }

    addReponse(id: number, reponseLibelle: string): Observable<Reponse> {
        const reponse = {
            id_reponse: id,
            libelle: reponseLibelle
        };
        return this.http.post<Reponse>(this.urlReponse, reponse, this.httpOption);
    }

    updateQuestion (question: Question) {
        return this.http.patch(this.urlQuestion + '?id=eq.' + question.id_question, question, this.httpOption);
    }

    updateReponse (reponse: Reponse) {
        return this.http.patch(this.urlReponse + '?id=eq.' + reponse.id_reponse, reponse, this.httpOption);
    }

    deleteQuestion (question: Question): Observable<Object> {
        return this.http.delete<Object>(this.urlQuestion + '?id=eq.' + question.id_question, this.httpOption);
    }

    deleteReponse (reponse: Reponse): Observable<Object> {
        return this.http.delete<Object>(this.urlReponse + '?id=eq.' + reponse.id_reponse, this.httpOption);
    }
}
