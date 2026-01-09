import { Component } from '@angular/core';
import { ConsultasService } from '../services/consultas.service';

@Component({
  selector: 'app-datos',
  standalone: false,
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})
export class DatosComponent {
  public year: string = "";
  public consulta: string = "";
  public alcance: string = "";
  public datosWeb: any;

  // Constructor
  constructor(private _consultasServices: ConsultasService) {

  }

  // Metodos
  enviarConsulta() {

    let categoria: string;
    let widget: string;
    let parametros = Array(4);  //Array de 4 posiciones para los parámetros de la consulta
 

    // Configuramos el valor de los parámetros de la consulta
    if (this.consulta == "INSTALADA") {
      categoria = "generacion";
      widget = "potencia-instalada";
    } else {
      categoria = "generacion";
      widget = "estructura-generacion";
      parametros[3] = this.alcance;
    }
    parametros[0] = this.year + "-01-01T00:00";
    parametros[1] = this.year + "-12-31T23:59";
    parametros[2] = "month";

    // Obtenemos los datos de la API
    this._consultasServices.read(categoria, widget, parametros).subscribe(
      result => {
        this.datosWeb = result;
      }
    )
  }
}

