import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ConfiguracionService } from '../services/configuracion.service';
import { Configuracion } from '../models/configuracion.model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{

  public user: string = "";
  public password: string = "";
  public textoBotonLogin: string = "LOGIN"
  private isUserLoggedIn: boolean = false;
  public configData?: Configuracion;
  
  constructor(private _loginService: LoginService, private _configuracionService: ConfiguracionService) {
    this._loginService.loginStatus$.subscribe(status => {
      this.isUserLoggedIn = status;
      this.textoBotonLogin = status ? "LOGOUT" : "LOGIN";
    });
  }

  ngOnInit(): void {
    // Leemos el archivo de configuración
      this._configuracionService.obtenerConfiguracion().subscribe({
      next: (resultado) => {
        this.configData = resultado;
        console.log('Objeto cargado:', this.configData.user);
      },
      error: (err) => console.error('Error al leer el JSON', err)
    });
  }

  // METODOS

  login() {
    if ( !this.isUserLoggedIn && this.user == this.configData?.user && this.password == this.configData.password) {
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
