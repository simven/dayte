import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {QuestionRedhi} from '@src/app/question-redhi';
import {ReponseRedhi} from '@src/app/reponse-redhi';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class QuestionReponseRedhiService {
    public urlQuestion = 'http://localhost:3000/question_redhi';
    public urlReponse = 'http://localhost:3000/reponse_redhi';
    public httpOption = {
        headers: new HttpHeaders({'Content-Type': 'application.json'})
    };

    constructor(private http: HttpClient) {
    }

    getQuestions(): Observable<QuestionRedhi[]> {
        return this.http.get<QuestionRedhi[]>(this.urlQuestion);
    }

    getReponses(): Observable<ReponseRedhi[]> {
        return this.http.get<ReponseRedhi[]>(this.urlReponse);
    }

    getQuestion(question: QuestionRedhi): Observable<QuestionRedhi> {
        return this.http.get<QuestionRedhi>(this.urlQuestion + '?id=eq.' + question.id_question);
    }

    getReponse(reponse: ReponseRedhi): Observable<ReponseRedhi> {
        return this.http.get<ReponseRedhi>(this.urlReponse + '?id=eq.' + reponse.id_reponse);
    }

    addQuestion(questionLibelle: string): Observable<QuestionRedhi> {
        const question = {
            libelle: questionLibelle
        };
        return this.http.post<QuestionRedhi>(this.urlQuestion, question, this.httpOption);
    }

    addReponse(id: number, reponseLibelle: string): Observable<ReponseRedhi> {
        const reponse = {
            id_reponse: id,
            libelle: reponseLibelle
        };
        return this.http.post<ReponseRedhi>(this.urlReponse, reponse, this.httpOption);
    }

    updateQuestion (question: QuestionRedhi) {
        return this.http.patch(this.urlQuestion + '?id=eq.' + question.id_question, question, this.httpOption);
    }

    updateReponse (reponse: ReponseRedhi) {
        return this.http.patch(this.urlReponse + '?id=eq.' + reponse.id_reponse, reponse, this.httpOption);
    }

    deleteQuestion (question: QuestionRedhi): Observable<Object> {
        return this.http.delete<Object>(this.urlQuestion + '?id=eq.' + question.id_question, this.httpOption);
    }

    deleteReponse (reponse: ReponseRedhi): Observable<Object> {
        return this.http.delete<Object>(this.urlReponse + '?id=eq.' + reponse.id_reponse, this.httpOption);
    }
}
