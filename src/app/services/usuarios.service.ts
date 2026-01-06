import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../models/usuario";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConsultasUsuariosService } from "./consultas.service";
import { OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

    public urlUsuarios: string = "";

    constructor(private _consultaUsuarios : ConsultasUsuariosService, public _http : HttpClient) {
        this.urlUsuarios = "https://6957a87cf7ea690182d2ab39.mockapi.io/api/usuarios/";
    }

    // Métodos
    read() : Observable<any> {
        return this._http.get(this.urlUsuarios);
    }

    readById(idUsuario: number) : Observable<any> {
        return this._http.get(this.urlUsuarios + idUsuario);
    }

    create(datosUsuario: any) : Observable<any> {
        return this._http.post<any>(this.urlUsuarios, datosUsuario);
    }

    update(idUsuario: number, datosUsuario: any) : Observable<any> {
        return this._http.put(this.urlUsuarios + idUsuario, datosUsuario);
    }
    
    delete(idUsuario: number) : Observable<any> {
        return this._http.delete(this.urlUsuarios + idUsuario);
    }

}