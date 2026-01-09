export class Usuario {
    // Atributos
    public id : number;
    public nombre : string;
    public apellidos : string;
    public foto : string;
    public email : string;

    // Constructor
    constructor(id: number, nombre: string, apellidos: string, foto: string, email: string) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.foto = foto;
        this.email = email;
    }

    // Métodos
    public getNombreCompleto() : string {
        return this.apellidos + ", " + this.nombre;
        // return this.nombre + " " + this.apellidos;
    }
}