import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService implements OnInit{

    public urlDatos: string;


    constructor(public _http : HttpClient) {
        this.urlDatos = "https://apidatos.ree.es/es/datos/";
    }

    ngOnInit(): void {


    }

    // Métodos
    read(categoria: string, widget: string, queryParameters: Array<string>) : Observable<any> {

    // Creamos la url base
    let url = this.urlDatos + categoria + "/" + widget;

    // Le añadimos las parámetros de consulta obligatorios
    const inicio = queryParameters[0];  // start_date
    const fin = queryParameters[1];  // end_date
    const time = queryParameters[2];  // time_trunc
    url += "?start_date=" + inicio + "&end_date=" + fin + "&time_trunc=" + time;

    // Le añadimos los parámetros de consulta optativos (si los hay)
    if (queryParameters[3] !== undefined) { // Se han definido limites geográficos
        const ids = queryParameters[3];
        url += "&geo_ids=" + ids;
    }

    // Lanzamos la consulta
      return this._http.get(url);
    }

}

