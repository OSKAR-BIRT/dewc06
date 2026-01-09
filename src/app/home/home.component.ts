import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private _route: ActivatedRoute;
  private _router: Router;
  public nombreURL: string = "";


  constructor(_route: ActivatedRoute, _router: Router) {
    this._route = _route;
    this._router = _router;
  }


  // ***********************************************
  // En ngOnInit lo que hacemos es cargar el router
  // ***********************************************
  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.nombreURL = params['nombre'];
    });
  }


  // *****************************************************
  // En linkTo cargamos la ruta que se pasa por parámetro
  // *****************************************************

  linkTo(ruta: string) {
    this._router.navigate(['/' + ruta]);
  }



}
