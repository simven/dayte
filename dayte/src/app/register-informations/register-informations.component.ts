import { Component, OnInit } from '@angular/core';
import {Question} from '@src/app/question';
import {QuestionReponseService} from '@src/app/question-reponse.service';
import {QuestionReponseRedhiService} from '@src/app/question-reponse-redhi.service';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
declare var $: any;
import { TimerService } from '@src/app/connected/timer.service';
import {PersonneService} from '@src/app/personne.service';
import {Personne} from '@src/app/personne';



@Component({
  selector: 'app-register-informations',
  templateUrl: './register-informations.component.html',
  styleUrls: ['./register-informations.component.scss']
})
export class RegisterInformationsComponent implements OnInit {
  questions: Array<Question>;
  personnes: Array<Personne>;

  informationsForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(public timerService: TimerService, private personneService: PersonneService, private questionReponseService: QuestionReponseService, private questionReponseRedhiService: QuestionReponseRedhiService, private router: Router, private titleService: Title) {

    this.titleService.setTitle('Inscription - Dayte');

    this.createForm();
  }

  async ngOnInit() {
    // load jquery input design/animation
    this.inputAnimation();

    this.questionReponseService.getQuestions()
        .subscribe(
            data => this.questions = data
        );
    this.personneService.getPersonnes()
        .subscribe(
            data => this.personnes = data
        );

    await this.delay(1000);
    this.triQuestions();
  }


  // create 'informationsForm' form
  createForm() {
    this.informationsForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[A-Z].*$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[A-Z].*$$')]),
      tel: new FormControl('', [Validators.required, Validators.pattern('^((\\\\+91-?)|0)?[0-9]{10}$')]),
      city: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}?$')])
    });
  }

  get firstName() {
    return this.informationsForm.get('firstName');
  }
  get lastName() {
    return this.informationsForm.get('lastName');
  }
  get tel() {
    return this.informationsForm.get('tel');
  }
  get city() {
    return this.informationsForm.get('city');
  }
  get zip() {
    return this.informationsForm.get('zip');
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

  onAddPersonne(nom: string, prenom: string, tel: number, ville: string, code_postal: number) {
    if (nom && prenom && tel && ville && code_postal) {
      this.personneService.addPersonne(nom, prenom, tel, ville, code_postal);
    }
  }

  // Redirect to /home once connected
  onSubmit() {
    this.onAddPersonne(this.firstName.value, this.lastName.value, this.tel.value, this.city.value, this.zip.value);
    this.router.navigate(['/home']);
  }


  inputAnimation() {
    // Form animation
    const InputLabel = (() => {
      // Ajoute la classe active
      const handleFocus = (e) => {
        const target = e.target;
        target.parentNode.classList.add('active');
      };

      // Supprime la classe active
      const handleBlur = (e) => {
        const target = e.target;
        if (!target.value) {
          target.parentNode.classList.remove('active');
        }
      };

      // Prend en compte les events (focus et blur)
      const bindEvents = (element) => {
        const input = element.querySelector('input');
        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);
      };

      // Recupere les elements (DOM)
      const init = () => {
        const form = document.querySelectorAll('.form-group');

        form.forEach((element) => {

          // Ajoute la classe active si l'input contient une valeur au chargement de la page
          if (element.querySelector('input').value) {
            element.classList.add('active');
          }

          bindEvents(element);
        });
      };

      return {
        init: init
      };
    })();

    InputLabel.init();
  }
}
