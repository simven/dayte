import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Personne} from '@src/app/models/personne.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import * as CryptoJS from 'crypto-js';
import {Title} from '@angular/platform-browser';
declare var $: any;
declare var require: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {

  registerForm: FormGroup;
  loginForm: FormGroup;
  error: any;
  returnUrl;
  personne: Personne = new Personne(-1, '', '', '', '', -1, -1, '', '', -1, -1, true);

  register = true;
  login = false;
  private passwordChanged: boolean;


  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Dayte');
  }

  ngOnInit() {
    // hide register button & show login screen & hide top page on load
    $('.registerButton').hide();
    $('.loginButton').show();
    $('#scrollUp').hide();


    // JQUERY ANIMATION

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        let target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 14)
          }, 1000, 'easeInOutExpo');
          return false;
        }
      }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 56
    });

    // Collapse Navbar
    const navbarCollapse = function() {
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


    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.createForm();

  }


  ngAfterViewInit() {
    this.scrolled();
    this.eyeToSeePwd();
    this.inputAnimation();
  }


  // show register screen & login button
  showRegister() {
    // hide register button & show login button
    $('.registerButton').hide();
    $('.loginButton').show();

    // set register & login values to display the correct screen
    this.register = true;
    this.login = false;
  }

  // show login screen & register button
  showLogin() {
    // show register button & hide login button
    $('.registerButton').show();
    $('.loginButton').hide();

    // set register & login values to display the correct screen
    this.register = false;
    this.login = true;
  }


  // Secure hashing password
  HashPwd(pwd: any) {
    'use strict';
    const crypto = require('crypto');

    const sha512 = function(password) {
      const hash = crypto.createHash('sha512');
      hash.update(password);
      const value = hash.digest('hex');
      return {
        passwordHash: value
      };
    };

    function HashPassword(userpassword) {
      const passwordData = sha512(userpassword);
      console.log('UserPassword = ' + userpassword);
      console.log('Passwordhash = ' + passwordData.passwordHash);
    }

    HashPassword(pwd);
  }


  // create 'loginForm' & 'registerForm' forms
  createForm() {
    this.registerForm = new FormGroup({
      gender: new FormControl(undefined, [Validators.required]),
      genderSearch: new FormControl(undefined, [Validators.required]),
      email: new FormControl(undefined, [Validators.required, Validators.email]),
      pwd: new FormGroup({
            password: new FormControl(undefined, [Validators.required, Validators.minLength(8)]),
            confirmPassword: new FormControl(undefined)
          }, [this.passwordConfirming]
      ),
    });

    this.loginForm = new FormGroup({
      emailLogin: new FormControl(undefined, [Validators.required, Validators.email]),
      passwordLogin: new FormControl(undefined, [Validators.required])
    });
  }

  // check if fields 'password' & 'confirm password' are equals
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return {invalid: true};
    }
  }

  get gender() {
    return this.registerForm.get('gender');
  }

  get genderSearch() {
    return this.registerForm.get('genderSearch');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('pwd.password');
  }

  get confirmPassword() {
    return this.registerForm.get('pwd.confirmPassword');
  }

  get emailLogin() {
    return this.loginForm.get('emailLogin');
  }

  get passwordLogin() {
    return this.loginForm.get('passwordLogin');
  }


  // eye to see password
  eyeToSeePwd() {
    $('#pwd i').on('click', function(event) {
      if (!this.passwordChanged && $('#pwd input').attr('type') === 'text') {
        $('#pwd input').attr('type', 'password');
        $('#pwd i').addClass( 'fa-eye-slash' );
        $('#pwd i').removeClass( 'fa-eye' );
      } else if (!this.passwordChanged && $('#pwd input').attr('type') === 'password') {
        $('#pwd input').attr('type', 'text');
        $('#pwd i').removeClass( 'fa-eye-slash' );
        $('#pwd i').addClass( 'fa-eye' );
      }
    });
  }

  scrolled() {
    const jQueryInstance = this;

    // Design when scrolling
    $(window).scroll(function () {
      if ($(document).scrollTop() > 250) {
        $('#scrollUp').show();
        $('.registerButton').show();
        $('.loginButton').show();
      } else {
        $('#scrollUp').hide();
        if (jQueryInstance.register && !jQueryInstance.login) {
          jQueryInstance.showRegister();
        } else if (!jQueryInstance.register && jQueryInstance.login) {
          jQueryInstance.showLogin();
        }
      }
    });
  }

  inputAnimation() {
    // Form animation
    const InputLabel = (() => {
      // Ajoute la classe active
      const handleFocus = (e) => {
        const target = e.target;
        target.parentNode.classList.add('active');
      };

      // Supprime la classe active
      const handleBlur = (e) => {
        const target = e.target;
        if (!target.value) {
          target.parentNode.classList.remove('active');
        }
      };

      // Prend en compte les events (focus et blur)
      const bindEvents = (element) => {
        const input = element.querySelector('input');
        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);
      };

      // Recupere les elements (DOM)
      const init = () => {
        const form = document.querySelectorAll('.form-group');

        form.forEach((element) => {

          // Ajoute la classe active si l'input contient une valeur au chargement de la page
          if (element.querySelector('input').value) {
            element.classList.add('active');
          }

          bindEvents(element);
        });
      };

      return {
        init: init
      };
    })();

    InputLabel.init();
  }


  onSubmitSignup() {

    // this.personne.mail = this.email.value;
    // const pwd = this.password.value;
    // this.authService.onRegister({personne: this.personne, pwd: this.personne.password.value})
    //     .subscribe(data => {
    //           this.router.navigate(['/']);
    //         },
    //         error => {
    //           console.log('erreur en retour : ', error);
    //           this.error = error;
    //           this.loading = false;
    //         });
    this.router.navigate(['/register-questionnaire']);


    // Pour le signup, il faut passé le pdw (text) dans la fonction de hashage puis le push dans la BDD
    this.HashPwd(this.password.value);
  }


  // onSubmitLogin() {
  //   this.authService.onLogin(this.loginForm.value)
  //       .pipe(first())
  //       .subscribe(
  //           data => {
  //             this.router.navigate([this.returnUrl]);
  //           },
  //           error => {
  //             this.error = error;
  //             this.loading = false;
  //           });
  // }

  onSubmitLogin(): void {
    this.authService.onLogin(this.loginForm.value).subscribe(
        (response) => {
          // En cas de succès redirige vers l'url stokée ou '/'
          this.router.navigate(['/home']);
        },
        (error) => {
          this.error = error.error;
        }
    );
    // Ré-initialise le formulaire
    this.loginForm.reset();

    // Pour le login, il faut vérifier si la valeur du pwd (text) passé dans la fonction de hashage est égale à la valeur pwd de la BDD
    this.HashPwd(this.passwordLogin.value);
  }

}
