import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuracion } from '../models/configuracion.model';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  constructor(private _http: HttpClient) { }

  obtenerConfiguracion() {
    return this._http.get<Configuracion>('config.json');
  }
}
