import { Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Personne} from '@src/app/personne';
import {Formulaire} from '@src/app/formulaire';
import {FormulaireRedhi} from '@src/app/formulaireRedhi';
import {AttributRecherche} from '@src/app/attributRecherche';
import {FormulaireService} from '@src/app/formulaire.service';
import {QuestionReponseRedhiService} from '@src/app/question-reponse-redhi.service';
import {QuestionRedhi} from '@src/app/question-redhi';
import {ReponseRedhi} from '@src/app/reponse-redhi';
import {Reponse} from '@src/app/reponse';
import {QuestionReponseService} from '@src/app/question-reponse.service';
import {PersonneService} from '@src/app/personne.service';
import {isEmpty} from 'rxjs/operators';
import { TimerService } from '@src/app/connected/timer.service';


@Component({
  selector: 'app-home-co',
  templateUrl: './home-co.component.html',
  styleUrls: ['./home-co.component.scss']
})
export class HomeCoComponent implements OnInit {

  personnes: Array<Personne>;
  personne: Personne;

  formulaires: Array<Formulaire>;
  formulaire: Formulaire;

  redhi = [];
  idReponseRedhi = [];
  idReponse = [];
  tableRedhi = [];
  table = [];
  bonFormulaire = [];

  formsRedhi: Array<FormulaireRedhi>;
  formRedhi: FormulaireRedhi;

  attributs: Array<AttributRecherche>;
  attribut: AttributRecherche;

  reponses: Array<Reponse>;
  reponse: Reponse;

  reponsesRedhi: Array<ReponseRedhi>;
  reponseRedhi: ReponseRedhi;

  tailleMin: number;
  tailleMax: number;
  ageMin: number;
  ageMax: number;

  a_virer: false;
  personne_a_garder = [];
  personne_score = [];


  // tslint:disable-next-line:max-line-length
  constructor(public timerService: TimerService, private titleService: Title, private personneService: PersonneService, private formulaireService: FormulaireService, private questionReponseService: QuestionReponseService, private questionReponseRedhiService: QuestionReponseRedhiService) {
    this.titleService.setTitle('Dayte');
  }

  async ngOnInit() {

    this.formulaireService.getFormulaires()
        .subscribe(
            data => this.formulaires = data
        );

    this.formulaireService.getFormulairesRedhi()
        .subscribe(
            data => this.formsRedhi = data
        );

    this.formulaireService.getAttributs()
        .subscribe(
            data => this.attributs = data
        );

    this.personneService.getPersonnes()
        .subscribe(
            data => this.personnes = data
        );

    this.questionReponseRedhiService.getReponses()
        .subscribe(
            data => this.reponsesRedhi = data
        );

    this.questionReponseService.getReponses()
        .subscribe(
            data => this.reponses = data
        );

    await this.delay(1500);
    this.getAttribut(1);
    this.remplirBonTable(1);
    this.remplirParPersonneRedhi();
    this.remplirParPersonne();
    this.verifRedhi(1);
    this.calculScore(1);
  }


  // create delay
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getAttribut(id: number) {
    for (let i = 0; i < this.attributs.length; i++) {
      if (this.attributs[i].id_personne === id) {
        this.ageMin = this.attributs[i].age_min;
        this.ageMin = this.attributs[i].age_min;
        this.ageMin = this.attributs[i].age_min;
        this.ageMin = this.attributs[i].age_min;
      }
    }
  }

  verifRedhi(id: number) {
    for (let i = 0; i < this.table.length; i++) {
      for (let j = 0; j < this.table[i].length; j++) {
        switch (this.table[i][j][1]) {
          case 8:
            if (this.table[i][j][0] !== id) {
              for (let k = 0; k < this.tableRedhi.length; k++) {
                for (let l = 0; l < this.tableRedhi[k].length; l++) {
                  if (this.tableRedhi[k][l][0] === id) {
                    if (this.tableRedhi[k][l][1] === 1) {
                      // tslint:disable-next-line:max-line-length
                      if (this.tableRedhi[k][l][2] === 257 && this.table[i][j][2] === 5 || this.tableRedhi[k][l][2] === 258 && this.table[i][j][2] === 6) {
                        this.personne_a_garder.push(this.table[i][j][0]);
                        console.log('L\'id des personnes compatibles avec les questions redhibitoires :');
                        console.log(this.personne_a_garder);
                      } else {
                        console.log('c est pas bon');
                      }
                    }
                  }
                }
              }
            }
        }
      }
    }
  }

  calculScore(id: number) {
    for (let i = 0; i < this.table.length; i++) {
      let score = 0;
      let id_concerne = 0;
      for (let j = 0; j < this.table[i].length; j++) {
        if (this.table[i][j][0] !== id && this.personne_a_garder.indexOf(this.table[i][j][0]) !== -1) {
          id_concerne = this.table[i][j][0];
          if (this.table[i][j][1] === 27) {
            for (let k = 0; k < this.bonFormulaire.length; k++) {
              if (this.bonFormulaire[k][1] === 27) {
                if (this.bonFormulaire[k][2] === this.table[i][j][2]) {
                  score ++;
                }
              }
            }
          } else if (this.table[i][j][1] === 28) {
            for (let k = 0; k < this.bonFormulaire.length; k++) {
              if (this.bonFormulaire[k][1] === 28) {
                if (this.bonFormulaire[k][2] === this.table[i][j][2]) {
                  score ++;
                }
              }
            }
          } else if (this.table[i][j][1] === 29) {
            for (let k = 0; k < this.bonFormulaire.length; k++) {
              if (this.bonFormulaire[k][1] === 29) {
                if (this.bonFormulaire[k][2] === this.table[i][j][2]) {
                  score ++;
                }
              }
            }
          }
        }
      }
      if (score !== 0) {
        score = (score / 3) * 100;
        this.personne_score.push([id_concerne, score]);
        break;
      }
    }
    console.log('L\'id de la personne gardée avec le score de compatibilité /100 :');
    console.log(this.personne_score);
  }

  remplirIdReponseRedhi() {
    for (let i = 0; i < this.reponsesRedhi.length; i++) {
      this.idReponseRedhi.push([this.reponsesRedhi[i].id_reponse, this.reponsesRedhi[i].libelle]);
    }
  }

  remplirIdReponse() {
    for (let i = 0; i < this.reponses.length; i++) {
      this.idReponse.push([this.reponses[i].id_reponse, this.reponses[i].libelle]);
    }
  }

  remplirBonTable(id: number) {
    for (let i = 0; i < this.formulaires.length; i++) {
      if (this.formulaires[i].id_personne === id) {
        this.bonFormulaire.push([this.formulaires[i].id_personne, this.formulaires[i].id_question, this.formulaires[i].id_reponse]);
      }
    }
  }

  remplirParPersonneRedhi() {
    let tmp = [];
    for (let i = 0; i < this.personnes.length; i++) {
      tmp = [];
      for (let j = 0; j < this.formsRedhi.length; j++) {
        if (this.formsRedhi[j].id_personne === i) {
          tmp.push([this.formsRedhi[j].id_personne, this.formsRedhi[j].id_question, this.formsRedhi[j].id_reponse]);
        }
      }
      if (tmp.length !== 0) {
        this.tableRedhi.push(tmp);
      }
    }
  }

  remplirParPersonne() {
    let tmp = [];
    for (let i = 0; i < this.personnes.length; i++) {
      tmp = [];
      for (let j = 0; j < this.formulaires.length; j++) {
        if (this.formulaires[j].id_personne === i) {
          tmp.push([this.formulaires[j].id_personne, this.formulaires[j].id_question, this.formulaires[j].id_reponse]);
        }
      }
      if (tmp.length !== 0) {
        this.table.push(tmp);
      }
    }
  }
}
