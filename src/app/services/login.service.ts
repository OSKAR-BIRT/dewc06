import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Inicializamos la variable como false
  private loginOK = new BehaviorSubject<boolean>(false);

  // Exponemos el valor como un observable
  loginStatus$ = this.loginOK.asObservable();

  // Métodos
  setLogin(estado: boolean) {
    this.loginOK.next(estado);
  }

  getLoginStatus() : boolean {
    return this.loginOK.getValue();
  }
}
