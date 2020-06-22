import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeCoComponent } from '@src/app/connected/home-co/home-co.component';
import { NavComponent } from '@src/app/nav/nav.component';
import { CurrentDayteComponent } from '@src/app/connected/current-dayte/current-dayte.component';
import { OldDaytesComponent } from '@src/app/connected/old-daytes/old-daytes.component';
import { QuestionnaireComponent } from '@src/app/connected/questionnaire/questionnaire.component';
import { AccountComponent } from '@src/app/connected/account/account.component';
import { PageNotFoundComponent } from '@src/app/page-not-found/page-not-found.component';
import { RegisterQuestionnaireComponent } from '@src/app/register-questionnaire/register-questionnaire.component';
import { RegisterInformationsComponent } from '@src/app/register-informations/register-informations.component';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeCoComponent,
    NavComponent,
    CurrentDayteComponent,
    OldDaytesComponent,
    QuestionnaireComponent,
    AccountComponent,
    PageNotFoundComponent,
    RegisterQuestionnaireComponent,
    RegisterInformationsComponent,
  ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NgxPageScrollModule,
        ReactiveFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule,
        TNSCheckBoxModule
    ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
