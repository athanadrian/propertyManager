import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { EmailValidator } from '../../shared/validators/email';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  public signupForm:any;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public navController: NavController, public loadingController: LoadingController,
    public alertController: AlertController, public formBuilder: FormBuilder, public authService: AuthService) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  signupUser(){
    this.submitAttempt=true;

    if(!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authService.connectAccount(this.signupForm.value.email, this.signupForm.value.password).then(()=>{
        this.loading.dismiss().then(()=>{
          this.navController.pop();
        });
      }, (error)=>{
        this.loading.dismiss().then(()=>{
          var errorMessage:string=error.message;
          let alert = this.alertController.create({
            message:errorMessage,
            buttons:[
              {
                text:"OK",
                role:"cancel"
              }
            ]
          });
          alert.present();
        });
      });
      this.loading=this.loadingController.create();
      this.loading.present();
    }
  }  

}
