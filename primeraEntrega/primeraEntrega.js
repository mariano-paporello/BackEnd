class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido
        this.libros = libros;
        this.mascotas=mascotas;
    }
    getFullName(){
        console.log(`El nombre del Usuario es: ${this.nombre} ${this.apellido}`);
    }
    addMascota(input){
       this.mascotas.push(input);
       return this.mascotas;
    }
    countMascotas(){
        console.log(`La cantidad de mascotas del Usuario es: ${this.mascotas.length}`);
    }
    addBook(nameOfBook, Author){
        this.libros = [...this.libros, {nombre:nameOfBook, autor:Author} ];
        return this.libros;
    }
    getBookNames(){
        let bookListNames = []
        this.libros.forEach(object => {
            bookListNames = [...bookListNames, object.nombre]
            return bookListNames
        });
        console.log(` Los Nombres de los Libros del Usuario son: ${bookListNames.join(", ")}.`)
    }
}
const usuarioRandom = new Usuario("Carlos", "Perez", [{nombre:"secretos de la vida", autor:"lorem"}, {nombre:"libro Random", autor:"autor Random"}, {nombre:"OverLord", autor:"Kugane Maruyama"}], ["gato", "loro", "tortuga", "orangutan"])
usuarioRandom.getFullName()
usuarioRandom.addMascota("perro")
usuarioRandom.countMascotas()
usuarioRandom.addBook("El señor de los anillos", "J. R. R. Tolkien")
usuarioRandom.getBookNames()

