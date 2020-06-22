import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ConnectionService} from '@src/app/connection/connection.service';
declare var $: any;


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public connectionService: ConnectionService) {}

  ngOnInit() {

    // Closes responsive menu when a scroll trigger link is clicked
    $('.link').click(function() {
      $('.navbar-collapse').collapse('hide');
    });


    // Collapse Navbar
    const navbarCollapse = function () {
      if ($('#mainNav').offset().top > 100) {
        $('#mainNav').addClass('navbar-scrolled');
      } else {
        $('#mainNav').removeClass('navbar-scrolled');
      }
    };

    // Collapse now if page is not at top
    navbarCollapse();

    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
  }

}
