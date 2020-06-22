import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Mon compte - Dayte');
  }

  ngOnInit() {
  }

}
