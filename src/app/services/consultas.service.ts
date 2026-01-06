import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultasUsuariosService {

    public urlDatos: string;


    constructor(public _http : HttpClient) {
        this.urlDatos = "https://apidatos.ree.es/es/datos/balance/balance-electrico?start_date=2019-01-01T00:00&end_date=2019-01-31T23:59&time_trunc=day";
    }

    ngOnInit(): void {


    }


}

