import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuariosService } from '../services/usuarios.service';
import { DatosComponent } from '../datos/datos.component';
import { LoginService } from '../services/login.service';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  providers: [UsuariosService]
})
export class UsuariosComponent implements OnInit{

  private _route: ActivatedRoute;
  private _router: Router;
  public nombreURL: string = "";
  public usuarios: Array<Usuario> = [];
  public nombreFormulario: string = "";
  public apellidosFormulario: string = "";
  public urlFormulario: string = "";
  public emailFormulario: string = "";
  public checkFormulario: boolean = false;
  public mostrarUsuarios: boolean = true;
  public cabeceraFormulario: string = "FORMULARIO SIN INICIALIZAR";
  public mensajeBoton: string = "BOTON SIN INICIALIZAR";
  public mensajeCheckBox: string = "Mensaje sin inicializar";
  public accionFormulario: string = "";
  public idSeleccionado: number = 0;
  public formularioBorrar: boolean = false;
  public isUserLoggedIn: boolean = false;


  constructor(_route: ActivatedRoute, _router: Router, 
    private _usuariosService: UsuariosService, private _loginService: LoginService) {
    this._route = _route;
    this._router = _router;
    // Leer los usuarios
  }


  // ********************************************************************************************
  // En ngOnInit lo que hacemos es cargar el router, la configuracion y leemos todos los usuarios
  // ********************************************************************************************
  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.nombreURL = params['nombre'];
    });
    // Cargamos desde la API REST los datos de los usuarios
    this.cargarTodosLosUsuarios();

    // Nos subscribimos al cambio del servicio login
    this._loginService.loginStatus$.subscribe(status => {
      this.isUserLoggedIn = status;
    });
  }


  redirigir() {
    this._router.navigate(['/datos']);
  }

  // **********************************************************************************
  // Petición GET all para cargar todos los usuarios
  // **********************************************************************************
  cargarTodosLosUsuarios() {
    this._usuariosService.read().subscribe(
      result => {
        this.cargarArrayUsuarios(result);
      },
      error => {
        console.log(<any>error);
      }
    )
  }


  // **********************************************************************************
  // Método que crea el array de usuarios a partir del resultado de la petición get all
  // **********************************************************************************
  cargarArrayUsuarios(usuariosLeidos: Array<any>) {
    // Vaciamos el array por si tiene datos
    this.usuarios.splice(0, this.usuarios.length);
    // Iteramos el array recibido del Api Rest y cargarmos el array usuarios
    usuariosLeidos.forEach((datoUsuario) => {
      const nombre = datoUsuario.nombre;
      const apellidos = datoUsuario.apellidos;
      const foto = datoUsuario.foto;
      const email = datoUsuario.email;
      const id = datoUsuario.id;
      this.usuarios.push(new Usuario(id, nombre, apellidos, foto, email));
    })
  }


  // ************************************************************************************
  // Método que carga el formulario para añadir un usuario en la API REST
  // ************************************************************************************
  formularioParaCrear(): void {

    // Comprobamos si estamos logeados, y si no lo estamos, salimos del método sin hacer nada
    if (!this.isUserLoggedIn) {
      this.popUpIrLogin("Acceso restringido", "Debes iniciar sesión para poder crear usuarios");
      return;
    }

    this.mostrarUsuarios = false;
    this.cabeceraFormulario = "AÑADIR NUEVO USUARIO"
    this.mensajeBoton = "AÑADIR USUARIO";
    this.mensajeCheckBox = "Confirmo que quiero crear un nuevo usuario";
    this.accionFormulario = "crear";

    // Vaciamos el formulario por si tiene datos, hasta que se carguen los datos correctos
    this.nombreFormulario = "";
    this.apellidosFormulario = "";
    this.emailFormulario = "";
    this.urlFormulario = "";
  }


  // ****************************************************************
  // Método que es llamado al pulsar EDITAR en la ficha de un usuario
  // ****************************************************************
  formularioParaEditar(id: number) {

    // Comprobamos si estamos logeados, y si no lo estamos, salimos del método sin hacer nada
    if (!this.isUserLoggedIn) {
      this.popUpIrLogin("Acceso restringido", "Debes iniciar sesión para poder editar usuarios");
      return;
    }

    // Si llegamos a este punto es que estamos logeados
    this.mostrarUsuarios = false;
    this.cabeceraFormulario = "EDITAR DATOS DE USUARIO"
    this.mensajeBoton = "REGISTRAR CAMBIOS";
    this.mensajeCheckBox = "Confirmo que quiero cambiar los datos de este usuario";
    this.accionFormulario = "editar";

    // Vaciamos el formulario por si tiene datos, hasta que se carguen los datos correctos
    this.nombreFormulario = "    Cargando elemento a editar. Espere ...";
    this.apellidosFormulario = "";
    this.emailFormulario = "";
    this.urlFormulario = "";

    this.idSeleccionado = id;

    // Leemos el usuario de la web y cargamos los datos en el formulario
    this._usuariosService.readById(id).subscribe({
      next: data => {
        console.log("leerUsuario", data);
        this.nombreFormulario = data.nombre;
        this.apellidosFormulario = data.apellidos;
        this.emailFormulario = data.email;
        this.urlFormulario = data.foto;
      },
      error: error => {
        console.log("leerUsuarios error", error);
      }
    })
  }


  // *****************************************************************************************************
  // Método que es llamado por el formulario al pulsar el botón de BORRAR USUARIO para eliminar un usuario
  // *****************************************************************************************************
  formularioParaBorrar (id: number) {

    // Comprobamos si estamos logeados, y si no lo estamos, salimos del método sin hacer nada
    if (!this.isUserLoggedIn) {
      this.popUpIrLogin("Acceso restringido", "Debes iniciar sesión para poder borrar usuarios");
      return;
    }

    this.mostrarUsuarios = false;
    this.cabeceraFormulario = "BORRAR USUARIO"
    this.mensajeBoton = "BORRAR USUARIO";
    this.mensajeCheckBox = "Confirmo que quiero borrar este usuario"
    this.accionFormulario = "borrar";
    this.formularioBorrar = true;

    // Vaciamos el formulario por si tiene datos, hasta que se carguen los datos correctos
    this.nombreFormulario = "    Cargando elemento a borrar. Espere ...";
    this.apellidosFormulario = "";
    this.emailFormulario = "";
    this.urlFormulario = "";

    this.idSeleccionado = id;

    // Leemos el usuario de la web y cargamos los datos en el formulario
    this._usuariosService.readById(id).subscribe({
      next: data => {
        console.log("Usuario leido para borrar", data);
        this.nombreFormulario = data.nombre;
        this.apellidosFormulario = data.apellidos;
        this.emailFormulario = data.email;
        this.urlFormulario = data.foto;
      },
      error: error => {
        console.log("leerUsuarios error", error);
      }
    })
  }


  // ************************************************************************************************
  // Método que es llamado por el formulario al pulsar el botón de ENVIAR para crear un nuevo usuario
  // ************************************************************************************************
  crearUsuario() {

    let nuevoId: number = 1;

    // Buscamos el último indice de los elementos del array para generar el siguiente para el id del nuevo elemento
    this.usuarios.forEach(usuario => {
      if (usuario.id > nuevoId) {
        nuevoId = usuario.id + 1;
      }
    })

    let usuario: any = {
      "nombre": this.nombreFormulario,
      "apellidos": this.apellidosFormulario,
      "foto": this.urlFormulario,
      "email": this.emailFormulario,
      "id": nuevoId
    }

    this._usuariosService.create(usuario).subscribe({
      next: data => {
        // Mostramos por consola el dato que nos devuelve la API
        console.log("Usuario creado:", data);
        // Volvemos a cargar los usuarios, para refrescar el nuevo añadido
        this.cargarTodosLosUsuarios();
      },
      error: error => {
        console.log("modificarUsuario error", error);
      }
    })

  }


  // ***************************************************************************************************************
  // Método que llama al método update (put id datos) para modificar los datos de un usuario concreto en la API REST
  // ***************************************************************************************************************
  modificarUsuario(id: number): void {

    let usuario: any = {
      "nombre": this.nombreFormulario,
      "apellidos": this.apellidosFormulario,
      "foto": this.urlFormulario,
      "email": this.emailFormulario,
      "id": id
    }

    this._usuariosService.update(id, usuario).subscribe({
      next: data => {
        // Mostramos por consola el dato que nos devuelve la API
        console.log("Usuario modificado", data);
        // Volvemos a cargar los usuarios, para refrescar el modificado
        this.cargarTodosLosUsuarios();      },
      error: error => {
        console.log("modificarUsuario error", error);
      }
    })
  }


  // **********************************************************************************************
  // Método que llama al método delete (delete id) para eliminar un usuario concreto en la API REST
  // **********************************************************************************************
  borrarUsuario(id: number): void {

    this._usuariosService.delete(id).subscribe({
      next: data => {
        // Mostramos por consola el dato que nos devuelve la API
        console.log("Usuario borrado: ", data);
        // Volvemos a cargar los usuarios, para refrescar el usuario borrado
        this.cargarTodosLosUsuarios();      
      },
      error: error => {
        console.log("borrarUsuarios error", error);
      }
    })
  }


  // *********************************************************************************************************
  // Método que se ejecuta al enviar los datos desde el formulario (para crear, modificar o borrar un usuario)
  // *********************************************************************************************************
  onSubmit() {
    this.checkFormulario = false;
    this.formularioBorrar = false;

    if (this.formularioCorrecto()) {

      if (this.accionFormulario == "borrar") { // Acciones si el formulario es de borrar
        this.borrarUsuario(this.idSeleccionado);
        this.mostrarUsuarios = true;
      } else if (this.accionFormulario == "editar") {  // Acciones si el formulario es de editar
        this.modificarUsuario(this.idSeleccionado);
        this.mostrarUsuarios = true;
      } else if (this.accionFormulario == "crear") { // Acciones si el formulario es de crear
        this.crearUsuario();
        this.mostrarUsuarios = true;
      } else {
        // Preparado por si se añaden más opciones
      }

    } else {
      this.popUpEnviarFormErroneo("ERROR EN EL FORMULARIO", "Alguno de los datos introducidos en el formulario no cumple con los requisitos. Reviseló por favor");
    }


  }


  // **************************************************************************
  // Método que se ejecuta al pulsar CANCELAR en el formulario (EDITAR O CREAR)
  // **************************************************************************
  cancelarFormulario() {
    // Desactivamos el checkbox por si se ha activado
    this.checkFormulario = false;
    // Ponemos a false formularioBorrar, por si hemos salido del formulario de borrado
    this.formularioBorrar = false;
    // Dejamos de mostrar el formulario y mostramos los usuarios
    this.mostrarUsuarios = true;
  }


  // *********************************************************************************************
  // Método que genera una ventana emergente al intentar usar opciones que necesitan estar logeado
  // *********************************************************************************************
  popUpIrLogin(titulo: string, texto: string) {
      Swal.fire({
        title: titulo,
        text: texto,
        icon: 'info', // También puedes usar 'warning' o 'error'
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ir al Login',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this._router.navigate(['/login']);
        }
      });
  }


  // *********************************************************************************************
  // Método que genera una ventana emergente al intentar enviar un formulario con campos erróneos
  // *********************************************************************************************
  popUpEnviarFormErroneo(titulo: string, texto: string) {
      Swal.fire({
        title: titulo,
        text: texto,
        icon: 'error', // También puedes usar 'warning' o 'error'
        // showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Corregir error',
        // cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // this._router.navigate(['/login']);
        }
      });
  }

  // *************************************************************************************************
  // Método que comprueba que los datos introducidos en el formulario cumplan con una serie de reglas
  // *************************************************************************************************
  formularioCorrecto(): boolean {
    const nombreCorrecto = this.nombreFormulario != "";
    const apellidosCorrectos = this.apellidosFormulario != "";
    const urlCorrecta = this.urlFormulario != "";
    const emailCorrecto = this.emailFormulario != "";
    return nombreCorrecto && apellidosCorrectos && urlCorrecta && emailCorrecto;
  }

}
