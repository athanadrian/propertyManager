import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../pages';

@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {

  constructor(public navController: NavController, public authService:AuthService) {}

  ionViewDidLoad() {
    
  }

  goToLogin(){
    this.navController.push(LoginPage);
  }

  goToPaymentsList(){
    this.authService.anonymousLogin().then(()=>{
      console.log('Anonymous Login OK')
    });
  }

}
