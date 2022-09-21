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
       this.mascotas.push(input)
    }
    countMascotas(){
        console.log(this.mascotas.lenght)
    }
    addBook(nameOfBook, Author){
        this.libros = [...this.mascotas, {nombre:nameOfBook, autor:Author} ]
    }
    getBookNames(){
        console.log(...this.libros.nombre)
    }
}