import { Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Page} from 'tns-core-modules/ui/page';

// class to make radio input
class RadioOption {
  id: number;
  text: any;
  selected = false;

  constructor(id: number, text: any) {
    this.id = id;
    this.text = text;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.tns.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  popupOpen = false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  genderRadio?: Array<RadioOption>;
  genderSearchRadio?: Array<RadioOption>;
  securePassword = true;


  constructor(page: Page) {
    // hide action bar
    page.actionBarHidden = true;
  }

  // set 'popupOpen' to true to open the sign in pop up
  signUp() {
    this.popupOpen = true;
  }

  // set 'popupOpen' to false to close the sign in pop up
  closePopup() {
    this.popupOpen = false;
  }

  ngOnInit() {
    this.createForm();
    this.createRadioInput();
  }


  // eye to see password
  seePassword() {
    this.securePassword = !this.securePassword;
  }


  // make radio input
  changeRadio(radioOption: RadioOption, radioInput): void {
    radioOption.selected = true;

    if (!radioOption.selected) {
      return;
    }

    // uncheck all other options
    radioInput.forEach(option => {
      if (option.text !== radioOption.text) {
        option.selected = false;
      }
    });
  }

  // create radio inputs from RadioOption class
  createRadioInput() {
    // radio icon for gender picker
    this.genderRadio = [
      new RadioOption(1, String.fromCharCode(0xf183)),
      new RadioOption(2, String.fromCharCode(0xf182)),
    ];

    // radio icon for gender searched picker
    this.genderSearchRadio = [
      new RadioOption(288, String.fromCharCode(0xf183)),
      new RadioOption(289, String.fromCharCode(0xf182)),
      new RadioOption(290, String.fromCharCode(0xf7bd)),
    ];
  }


  // create 'loginForm' & 'registerForm' forms
  createForm() {
    this.loginForm = new FormGroup({
      emailLogin: new FormControl(undefined, [Validators.required, Validators.email]),
      passwordLogin: new FormControl(undefined, [Validators.required])
    });

    this.registerForm = new FormGroup({
      // gender: new FormControl(undefined, [Validators.required]),
      // genderSearch: new FormControl(undefined, [Validators.required]),
      email: new FormControl(undefined, [Validators.required, Validators.email]),
      pwd: new FormGroup({
            password: new FormControl(undefined, [Validators.required, Validators.minLength(8)]),
            confirmPassword: new FormControl(undefined)
          }, [this.passwordConfirming]
      ),
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


  onSubmitSignup() {
    /*console.log(this.registerForm.value);

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

    // Pour le signup, il faut passé le pdw (text) dans la fonction de hashage puis le push dans la BDD
    this.HashPwd(this.password.value);*/
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
    /*console.log('contenu du formulaire : ', this.loginForm.value);
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
    this.HashPwd(this.passwordLogin.value);*/
    console.log(this.loginForm.value);
  }

}
