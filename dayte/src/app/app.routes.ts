import {Routes} from '@angular/router';
import {HomeComponent} from '@src/app/home/home.component';
import {HomeCoComponent} from '@src/app/connected/home-co/home-co.component';
import {CurrentDayteComponent} from '@src/app/connected/current-dayte/current-dayte.component';
import {OldDaytesComponent} from '@src/app/connected/old-daytes/old-daytes.component';
import {QuestionnaireComponent} from '@src/app/connected/questionnaire/questionnaire.component';
import {AccountComponent} from '@src/app/connected/account/account.component';
import {RegisterQuestionnaireComponent} from '@src/app/register-questionnaire/register-questionnaire.component';
import {RegisterInformationsComponent} from '@src/app/register-informations/register-informations.component';
import {PageNotFoundComponent} from '@src/app/page-not-found/page-not-found.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },

    {
        path: 'home',
        component: HomeCoComponent,
        // canActivate: [AuthGuardService],
    },
    {
        path: 'dayte',
        component: CurrentDayteComponent,
        // canActivate: [AuthGuardService],
    },
    {
        path: 'oldDayte',
        component: OldDaytesComponent,
        // canActivate: [AuthGuardService],
    },
    {
        path: 'questionnaire',
        component: QuestionnaireComponent,
        /*canActivate: [AuthGuardService]*/
    },
    {
        path: 'account',
        component: AccountComponent,
        // canActivate: [AuthGuardService],
    },
    {
        path: 'register-questionnaire',
        component: RegisterQuestionnaireComponent,
        // canActivate: [AuthGuardService],
    },
    {
        path: 'register-informations',
        component: RegisterInformationsComponent,
        // canActivate: [AuthGuardService],
    },

    {
        path: '**',
        component: PageNotFoundComponent,
    }
];
