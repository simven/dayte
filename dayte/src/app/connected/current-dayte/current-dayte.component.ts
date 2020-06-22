import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { loadCldr, L10n } from '@syncfusion/ej2-base';
import {Title} from '@angular/platform-browser';
declare var require: any;
loadCldr(
    require('cldr-data/main/fr/numbers.json'),
    require('cldr-data/main/fr/ca-gregorian.json'),
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/fr/timeZoneNames.json'),
    require('cldr-data/supplemental/weekdata.json')
);

declare var $: any;


@Component({
  selector: 'app-current-dayte',
  templateUrl: './current-dayte.component.html',
  styleUrls: ['./current-dayte.component.scss']
})
export class CurrentDayteComponent implements OnInit {

  // attributes for date picker in html
  public minDate = new Date ();
  public maxDate = new Date ();

  rdv: FormGroup;

  constructor(private titleService: Title) {
    this.titleService.setTitle('Mon dayte - Dayte');
  }


  ngOnInit() {
    // create "rdv" form
    this.createForm();

    // initialize the max value to the current date +1 year
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);

    // translate today label in french
    L10n.load({
      fr: {
        datepicker: {
          today: 'Aujourd\'hui'
        }
      }
    });

    // initialize clock picker options
    $('.clockpicker').clockpicker({
      'default': 'now',
      vibrate: true,
      autoclose: true,
      twelvehour: false
    });
  }


  createForm() {
    this.rdv = new FormGroup({
      date: new FormControl(undefined, [Validators.required]),
      clock: new FormControl(undefined, [Validators.required]),
      place: new FormControl(undefined, [Validators.required])
    });
  }

  get date() {
    return this.rdv.get('date');
  }

  get clock() {
    return this.rdv.get('clock');
  }

  get place() {
    return this.rdv.get('place');
  }

  onSubmit() {
  }

}
