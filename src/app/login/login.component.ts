import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  public user: string = "";
  public password: string = "";
  public textoBotonLogin: string = "LOGIN"
  private isUserLoggedIn: boolean = false;
  

  constructor(private _loginService: LoginService) {
    this._loginService.loginStatus$.subscribe(status => {
      this.isUserLoggedIn = status;
      this.textoBotonLogin = status ? "LOGOUT" : "LOGIN";
    });
  }

  // METODOS

  login() {
    if ( !this.isUserLoggedIn && this.user == "admin" && this.password == "1234") {
      this.textoBotonLogin = "LOGOUT"
      this.user = "";
      this.password = "";
      this._loginService.setLogin(true);
      return;
    }

    if (this.isUserLoggedIn) {
      this.textoBotonLogin = "LOGIN"
      this._loginService.setLogin(false);
      return;
    }
  }
}
