import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Route } from "@angular/router";

import { UsuariosComponent } from "./usuarios/usuarios.component";
import { DatosComponent } from "./datos/datos.component"; 
import { HomeComponent } from "./home/home.component";

const appRoutes : Routes = [
    {path: '', component: HomeComponent},
    {path: 'datos', component: DatosComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'usuarios/:nombre', component: UsuariosComponent},
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);