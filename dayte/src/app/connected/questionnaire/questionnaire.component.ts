import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Question} from '@src/app/question';
import {Reponse} from '@src/app/reponse';
import {QuestionReponseService} from '@src/app/question-reponse.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Formulaire} from '@src/app/formulaire';
import {FormulaireService} from '@src/app/formulaire.service';
import {Title} from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit, AfterViewInit {

  questions: Array<Question>;
  question: Question;
  questionLibelle = '';
  selectedQuestion: Question;

  reponses: Array<Reponse>;
  reponse: Reponse;
  reponseLibelle = '';
  id_question = -1;
  selectedReponse: Reponse;
  questionForm: FormGroup;

  formulaires: Array<Formulaire>;
  formulaire: Formulaire;
  selectedFormulaire: Formulaire;


  // tslint:disable-next-line:max-line-length
  constructor(private questionReponseService: QuestionReponseService, private formulaireService: FormulaireService, private titleService: Title) {
    this.titleService.setTitle('Questionnaire - Dayte');
  }


  async ngOnInit() {
    // hide top page button on load
    $('#scrollUp').hide();

    this.questionReponseService.getQuestions()
        .subscribe(
            data => this.questions = data
        );
    this.questionReponseService.getReponses()
        .subscribe(
            data => this.reponses = data
        );

    this.formulaireService.getFormulaires()
        .subscribe(
            data => this.formulaires = data
        );

    await this.delay(1500);
    this.triQuestions();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // sort 'questions' tab
  triQuestions() {
    this.questions.sort(function(a, b) {
      return a.id_question - b.id_question;
    });
  }


  onCheckboxChange(e) {
    const checkArray: FormArray = this.questionForm.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  refreshListOfQuestions() {
    this.questionReponseService.getQuestions()
        .subscribe(
            data => this.questions = data
        );
  }

  refreshListOfReponses() {
    this.questionReponseService.getReponses()
        .subscribe(
            data => this.reponses = data
        );
  }

  onGetQuestion() {
    if (this.selectedQuestion) {
      this.questionReponseService.getQuestion(this.selectedQuestion)
          .subscribe(
              data => this.question = data,
              error => console.error(error)
          );
    }
  }

  onGetReponse() {
    if (this.selectedReponse) {
      this.questionReponseService.getReponse(this.selectedReponse)
          .subscribe(
              data => this.reponse = data,
              error => console.error(error)
          );
    }
  }

  onGetFormulaire() {
    if (this.selectedFormulaire) {
      this.formulaireService.getFormulaire(this.selectedFormulaire)
          .subscribe(
              data => this.formulaire = data,
              error => console.error(error)
          );
    }
  }

  onSelectedQuestion(question: Question) {
    if (question) {
      this.selectedQuestion = question;
      this.questionLibelle = question.libelle;
      console.log('you have picked a question');
    }
  }

  onSelectedReponse(reponse: Reponse) {
    if (reponse) {
      this.selectedReponse = reponse;
      this.reponseLibelle = reponse.libelle;
      console.log('you have picked an answer');
    }
  }

  onAddQuestion(questionLibelle: string) {
    if (questionLibelle) {
      this.questionReponseService.addQuestion(questionLibelle)
          .subscribe(
              () => {
                this.refreshListOfQuestions();
                this.questionLibelle = '';
              }
          );
    } else {
      console.log('add person name');
    }
  }

  onAddReponse(id_question: number, libelle: string) {
    if (id_question && libelle) {
      this.questionReponseService.addReponse(id_question, libelle)
          .subscribe(
              () => {
                this.refreshListOfReponses();
                this.id_question = -1;
                this.reponseLibelle = '';
              }
          );
    } else {
      console.log('add person name');
    }
  }

  onUpdateQuestion() {
    if (this.selectedQuestion) {
      this.selectedQuestion.libelle = this.questionLibelle ? this.questionLibelle : this.selectedQuestion.libelle;
      this.questionReponseService.updateQuestion(this.selectedQuestion)
          .subscribe(
              () => {
                this.refreshListOfQuestions();
                this.questionLibelle = '';
              }
          );
    } else {
      console.log('pick the question');
    }
  }

  onUpdateReponse() {
    if (this.selectedReponse) {
      this.selectedReponse.id_question = this.id_question ? this.id_question : this.selectedReponse.id_question;
      this.selectedReponse.libelle = this.reponseLibelle ? this.reponseLibelle : this.selectedReponse.libelle;
      this.questionReponseService.updateReponse(this.selectedReponse)
          .subscribe(
              () => {
                this.refreshListOfReponses();
                this.id_question = -1;
                this.reponseLibelle = '';
              }
          );
    } else {
      console.log('pick the answer');
    }
  }

  onDeleteQuestion () {
    if (this.selectedQuestion) {
      this.questionReponseService.deleteQuestion(this.selectedQuestion)
          .subscribe(
              () => {
                this.refreshListOfQuestions();
                this.questionLibelle = '';
              }
          );
    } else {
      console.log('pick the question');
    }
  }

  onDeleteReponse () {
    if (this.selectedReponse) {
      this.questionReponseService.deleteReponse(this.selectedReponse)
          .subscribe(
              () => {
                this.refreshListOfReponses();
                this.id_question = -1;
                this.reponseLibelle = '';
              }
          );
    } else {
      console.log('pick the answer');
    }
  }

  ngAfterViewInit() {
    $(window).scroll(function () {
      if ($(document).scrollTop() > 250) {
        $('#scrollUp').show();
      } else {
        $('#scrollUp').hide();
      }
    });
  }

  onSubmit() {
    console.log(this.questionForm.value);
  }
}
