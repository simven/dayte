import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {Question} from '@src/app/question';
import {Reponse} from '@src/app/reponse';
import {QuestionReponseService} from '@src/app/question-reponse.service';
import {QuestionReponseRedhiService} from '@src/app/question-reponse-redhi.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {LabelType, Options} from 'ng5-slider';
import {Title} from '@angular/platform-browser';
import {QuestionRedhi} from '@src/app/question-redhi';
import {ReponseRedhi} from '@src/app/reponse-redhi';
import {FormulaireService} from '@src/app/formulaire.service';
import {Formulaire} from '@src/app/formulaire';
import {Router} from '@angular/router';
import {isArray} from 'util';
import {FormulaireRedhi} from '@src/app/formulaireRedhi';
import {AttributRecherche} from '@src/app/attributRecherche';
declare var $: any;

// interface uses for slider without range
interface SimpleSliderModel {
    value: number;
    options: Options;
}

// interface uses for slider with range
interface RangeSliderModel {
    minValue: number;
    maxValue: number;
    options: Options;
}

@Component({
    selector: 'app-register-questionnaire',
    templateUrl: './register-questionnaire.component.html',
    styleUrls: ['./register-questionnaire.component.scss']
})
export class RegisterQuestionnaireComponent implements OnInit {
    // attributes for questions in database
    questions: Array<Question>;
    question: Question;
    questionLibelle = '';
    selectedQuestion: Question;

    // attributes for answers in database
    reponses: Array<Reponse>;
    reponse: Reponse;
    reponseLibelle = '';
    id_question = -1;
    selectedReponse: Reponse;

    // attributes for crippling questions in database
    questionsRedhi: Array<QuestionRedhi>;
    questionRedhi: QuestionRedhi;
    questionRedhiLibelle = '';
    selectedQuestionRedhi: Question;

    // attributes for crippling answers in database
    reponsesRedhi: Array<ReponseRedhi>;
    reponseRedhi: ReponseRedhi;
    reponseLibelleRedhi = '';
    id_questionRedhi = -1;
    selectedReponseRedhi: ReponseRedhi;

    // attributes for form in database
    formulaires: Array<Formulaire>;
    formulaire: Formulaire;

    // attributes for form_redhi in database
    formulairesRedhi: Array<FormulaireRedhi>;
    formulaireRedhi: FormulaireRedhi;

    // attributes for attributRecherche in database
    attributsRecherche: Array<AttributRecherche>;
    attributRecherche: AttributRecherche;

    // attribute to create a form

    questionForm: FormGroup;

    // attribute to store all the questions (normal & crippling)
    tabQuestions: any;

    // attributes for date picker in html
    public minDate = new Date();
    public maxDate = new Date();

    valeur = [];
    attribut = [];
    attributRechercher = [];
    form = [];
    formRedhi = [];
    currentId = 0;
    cpt = 0;

    // keys table use for 'formControlName'
    keys = [
        'birthdate', 'size',  'dependentChild', 'futureChild', 'levelStudy', 'smoke', 'alcohol',
        'corpulence', 'hairLength', 'hairColor', 'origin', 'religion', 'activity', 'ageSearch', 'sizeSearch', 'distance',
        'levelStudySearch', 'alcoholSearch', 'hairLengthSearch', 'hairColorSearch', 'activitySearch', 'season', 'atmosphere', 'nature',
        'animal', 'hobby', 'beach', 'holidaysDestination', 'holidays', 'landscape', 'eat', 'spendTime', 'contact', 'pay', 'group',
        'conversation', 'friends', 'planning', 'expressions', 'hobbies', 'adjectives', 'firstName', 'lastName', 'tel', 'zip', 'city',
        'dependentChildSearch', 'futureChildSearch', 'smokeSearch', 'corpulenceSearch', 'originSearch', 'religionSearch'
    ];

    // table containing only register information keys
    registerInformationKeys = [
        'firstName', 'lastName', 'tel', 'zip', 'city'
    ];

    // table containing the id of the 'radio button' questions
    radio = [8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 29, 30, 31, 32, 33, 34, 36, 37, 38, 39, 41, 42, 52, 53, 54];

    // table containing the id of the 'checkbox button' questions
    checkbox = [22, 23, 24, 25, 26, 44, 46, 56, 57];

    // table containing the keys of the slider questions
    slider = ['size', 'ageSearch', 'sizeSearch', 'group'];

    // slider for size picker
    sizeSlider: SimpleSliderModel = {
        value: 170,
        options: {
            floor: 100,
            ceil: 200,
            vertical: true,
            translate: (value: number, label: LabelType): string => {
                switch (label) {
                    case LabelType.Floor:
                        return value + ' cm ou moins';
                    case LabelType.Ceil:
                        return value + ' cm ou plus';
                    default:
                        return value + ' cm';
                }
            }
        }
    };

    // slider for group question
    groupSlider: SimpleSliderModel = {
        value: 5,
        options: {
            showTicksValues: true,
            stepsArray: [
                {value: 0, legend: 'Petit groupe'},
                {value: 1},
                {value: 2},
                {value: 3},
                {value: 4},
                {value: 5},
                {value: 6},
                {value: 7},
                {value: 8},
                {value: 9},
                {value: 10, legend: 'Grand groupe'}
            ]
        }
    };

    // slider for age searched question
    ageSearchedSlider: RangeSliderModel = {
        minValue: 30,
        maxValue: 35,
        options: {
            floor: 18,
            ceil: 90,
            step: 1,
            minRange: 3,
            translate: (value: number, label: LabelType): string => {
                switch (label) {
                    case LabelType.Ceil:
                        return value + ' ans ou plus';
                    default:
                        return value + ' ans';
                }
            }
        }
    };

    // slider for size searched question
    sizeSearchedSlider: RangeSliderModel = {
        minValue: 160,
        maxValue: 180,
        options: {
            floor: 100,
            ceil: 200,
            step: 10,
            minRange: 10,
            vertical: true,
            translate: (value: number, label: LabelType): string => {
                switch (label) {
                    case LabelType.Floor:
                        return value + ' cm ou moins';
                    case LabelType.Ceil:
                        return value + ' cm ou plus';
                    default:
                        return value + ' cm';
                }
            }
        }
    };

    // slider for distance question
    distanceSlider: SimpleSliderModel = {
        value: 90,
        options: {
            floor: 10,
            ceil: 300,
            step: 10,
            translate: (value: number, label: LabelType): string => {
                switch (label) {
                    case LabelType.Floor:
                        return value + ' km ou moins';
                    case LabelType.Ceil:
                        return value + ' km ou plus';
                    default:
                        return value + ' km';
                }
            }
        }
    };


    // tslint:disable-next-line:max-line-length
    constructor(private formulaireService: FormulaireService, private questionReponseService: QuestionReponseService, private questionReponseRedhiService: QuestionReponseRedhiService, private titleService: Title, private router: Router) {
        this.titleService.setTitle('Questionnaire - Dayte');

        // initialize the min date value to the current date -120 years
        this.minDate.setFullYear(this.minDate.getFullYear() - 120);
        // initialize the max date value to the current date -18 years
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

        this.createForm();
    }

    async ngOnInit() {
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

        this.formulaireService.getFormulairesRedhi()
            .subscribe(
                data => this.formulairesRedhi = data
            );

        this.formulaireService.getAttributs()
            .subscribe(
                data => this.attributsRecherche = data
            );

        this.questionReponseRedhiService.getQuestions()
            .subscribe(
                data => this.questionsRedhi = data
            );
        this.questionReponseRedhiService.getReponses()
            .subscribe(
                data => this.reponsesRedhi = data
            );

        // await pour que les informations de la base de données soient bien push dans les tableaux correspondant
        // (sinon "ERROR : this.question is undefined")
        await this.delay(1500);
        this.triQuestions();
        this.triReponses();
        this.triQuestionsRedhi();
        this.triReponsesRedhi();
        this.fillingQuestionsTab();
    }

    // create questionForm form
    createForm() {
        this.questionForm = new FormGroup({
            // add FormControl for slider questions
            size : new FormControl(this.sizeSlider.value, Validators.required),
            ageSearch: new FormControl([this.ageSearchedSlider.minValue, this.ageSearchedSlider.maxValue], Validators.required),
            sizeSearch: new FormControl([this.sizeSearchedSlider.minValue, this.sizeSearchedSlider.maxValue], Validators.required),
            group: new FormControl(this.groupSlider.value, Validators.required),

            // add FormArray for checkbox questions
            levelStudySearch: new FormArray([], Validators.required),
            alcoholSearch: new FormArray([], Validators.required),
            hairLengthSearch: new FormArray([], Validators.required),
            hairColorSearch: new FormArray([], Validators.required),
            activitySearch: new FormArray([], Validators.required),
            expressions: new FormArray([], Validators.required),
            hobbies: new FormArray([], Validators.required),
            adjectives: new FormArray([], Validators.required),
            corpulenceSearch: new FormArray([], Validators.required),
            originSearch: new FormArray([], Validators.required),
            religionSearch: new FormArray([], Validators.required),
        });

        // add formControl for all the question
        for (let i = 0; i < 52; i++) {
            if (!this.slider.includes(this.keys[i])) {
                this.questionForm.addControl(this.keys[i], new FormControl('', Validators.required));
            }
        }

        // remove useless control
        this.registerInformationKeys.forEach(e => this.questionForm.removeControl(e));
    }

    // for each checkbox question, add the formControl in the corresponding formArray in order to recover the picked value
    onCheckboxChange(e, itemQuestion) {
        const checkArray: FormArray = this.questionForm.get(itemQuestion) as FormArray;

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

    // create delay
    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // sort questions table
    triQuestions() {
        this.questions.sort(function(a, b) {
            return a.id_question - b.id_question;
        });
    }

    // sort answers table
    triReponses() {
        this.reponses.sort(function(a, b) {
            return a.id_reponse - b.id_reponse;
        });
    }

    // sort crippling questions table
    triQuestionsRedhi() {
        this.questionsRedhi.sort(function(a, b) {
            return a.id_question - b.id_question;
        });
    }

    // sort crippling answers table
    triReponsesRedhi() {
        this.reponsesRedhi.sort(function(a, b) {
            return a.id_reponse - b.id_reponse;
        });
    }


    // filled the 'tabQuestions' table (with an id, a question label, a key and a boolean attribute to hide the not current questions)
    // which will be used to display the questions in html
    fillingQuestionsTab() {
        // push the first question
        this.tabQuestions = [
            {id: this.questions[4].id_question, question: this.questions[4].libelle, key: this.keys[0], isHidden: false},
        ];

        // push the other questions
        for (let i = 5; i < 45; i++) {
            // tslint:disable-next-line:max-line-length
            this.tabQuestions.push({id: this.questions[i].id_question, question: this.questions[i].libelle, key: this.keys[i - 4], isHidden: true});
        }

        // push the crippling questions in the right place
        this.tabQuestions.splice(16, 0, {id: 52, question: this.questionsRedhi[0].libelle, key: this.keys[46], isHidden: true});
        this.tabQuestions.splice(17, 0, {id: 53, question: this.questionsRedhi[1].libelle, key: this.keys[47], isHidden: true});
        this.tabQuestions.splice(19, 0, {id: 54, question: this.questionsRedhi[2].libelle, key: this.keys[48], isHidden: true});
        this.tabQuestions.splice(21, 0, {id: 55, question: this.questionsRedhi[3].libelle, key: this.keys[49], isHidden: true});
        this.tabQuestions.splice(24, 0, {id: 56, question: this.questionsRedhi[4].libelle, key: this.keys[50], isHidden: true});
        this.tabQuestions.splice(25, 0, {id: 57, question: this.questionsRedhi[5].libelle, key: this.keys[51], isHidden: true});
    }

    // refresh list of questions et questions redhi
    refreshListOfQuestions() {
        this.questionReponseService.getQuestions()
            .subscribe(
                data => this.questions = data
            );
        this.questionReponseRedhiService.getQuestions()
            .subscribe(
                data => this.questionsRedhi = data
            );
    }

    // refresh list of answers
    refreshListOfReponses() {
        this.questionReponseService.getReponses()
            .subscribe(
                data => this.reponses = data
            );
        this.questionReponseRedhiService.getReponses()
            .subscribe(
                data => this.reponsesRedhi = data
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

    // use to post on the database formulaire
    onAddReponse(id_personne: number, id_question: number, id_reponse: number) {
        if (id_personne && id_question && id_reponse) {
            this.formulaireService.addReponse(id_personne, id_question, id_reponse);
        }
    }

    // use to post on the database form_redhi
    onAddReponseRedhi(id_personne: number, id_question: number, id_reponse: number) {
        if (id_personne && id_question && id_reponse) {
            this.formulaireService.addReponseRedhi(id_personne, id_question, id_reponse);
        }
    }

    onAddAttribut(id_personne: number, age_min: number, age_max: number, taille_min: number, taille_max: number) {
        if (id_personne && age_min && age_max && taille_max && taille_max) {
            this.formulaireService.addAttribut(id_personne, age_min, age_max, taille_min, taille_max);
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

    // post all values in the database
    onSubmit() {
        let cptRedhi = 1;
        for (let i = 0; i < this.valeur.length; i++) {
            if (this.valeur[i][1] < 8) {
                this.attribut.push(this.valeur[i][2]);
            } else if (this.valeur[i][1] === 19 || this.valeur[i][1] === 20) {
                this.attributRechercher.push(this.valeur[i][2]);
            } else if (this.valeur[i][1] > 46) {
                this.formRedhi.push(this.valeur[i]);
            } else {
                this.form.push(this.valeur[i]);
            }
        }

        for (let i = 0; i < this.form.length; i++) {
            this.onAddReponse(this.form[i][0], this.form[i][1], this.form[i][2]);
        }

        for (let i = 0; i < this.formRedhi.length; i++) {
            this.onAddReponseRedhi(this.formRedhi[i][0], cptRedhi, this.formRedhi[i][2]);
            cptRedhi ++;
        }

        // tslint:disable-next-line:max-line-length
        this.onAddAttribut(2, this.attributRechercher[0], this.attributRechercher[1], this.attributRechercher[2] , this.attributRechercher[3])

        this.router.navigate(['/register-informations']);
    }

    // get a value for one question (clicking on next)
    onNext(id: number) {
        this.currentId = id;
        if (+this.questionForm.get(this.keys[this.currentId - 6]).value === null) {
        } else {
            if (!isArray(this.questionForm.get(this.keys[this.currentId - 6]).value)) {
                this.valeur.push([3, this.currentId, +this.questionForm.get(this.keys[this.currentId - 6]).value]);
            } else {
                this.questionForm.get(this.keys[this.currentId - 6]).value.forEach((v: number): void => {
                    this.valeur.push([3, this.currentId, +v]);
                });
            }
        }
    }

    // remove a value on clicking on previous
    onPrevious() {

        const lastID = this.valeur[this.valeur.length - 1][1];
        for (let i = 0; i < this.valeur.length; i++) {
            if (this.valeur[i][1] === lastID) {
                this.valeur.pop();
            }
        }
        this.currentId = lastID;
    }
}
