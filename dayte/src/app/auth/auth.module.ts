import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {HomeComponent} from '@src/app/home/home.component';
import {NgxPageScrollModule} from 'ngx-page-scroll';

@NgModule({
  declarations: [HomeComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        NgxPageScrollModule
    ]
})
export class AuthModule { }
