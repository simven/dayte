import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeCoComponent } from '@src/app/connected/home-co/home-co.component';
import { NavComponent } from '@src/app/nav/nav.component';
import { CurrentDayteComponent } from '@src/app/connected/current-dayte/current-dayte.component';
import { OldDaytesComponent } from '@src/app/connected/old-daytes/old-daytes.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { PlacePickerModule } from 'ngx-place-picker';
import { QuestionnaireComponent } from '@src/app/connected/questionnaire/questionnaire.component';
import { AccountComponent } from '@src/app/connected/account/account.component';
import { PageNotFoundComponent } from '@src/app/page-not-found/page-not-found.component';
import { RegisterQuestionnaireComponent } from '@src/app/register-questionnaire/register-questionnaire.component';
import { Ng5SliderModule } from 'ng5-slider';
import { RegisterInformationsComponent } from '@src/app/register-informations/register-informations.component';

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
    RegisterQuestionnaireComponent,
    PageNotFoundComponent,
    RegisterInformationsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPageScrollModule,
    ReactiveFormsModule,
    HttpClientModule,
    DatePickerModule,
    TimePickerModule,
    PlacePickerModule,
    Ng5SliderModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
