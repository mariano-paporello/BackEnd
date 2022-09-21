class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido
        this.libros = libros;
        this.mascotas=mascotas;
    }
    getFullName(){
        console.log(`${this.nombre} ${this.apellido}`)
    }
    addMascota(input){
        this.mascotas={...this.mascotas, input}
    }
    countMascotas(){
        console.log(this.mascotas.lenght)
    }
    
}