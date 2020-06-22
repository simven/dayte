import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-old-daytes',
  templateUrl: './old-daytes.component.html',
  styleUrls: ['./old-daytes.component.scss']
})
export class OldDaytesComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Mes anciens daytes - Dayte');
  }

  ngOnInit() {
  }

}
