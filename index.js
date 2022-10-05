class Usuario {
    constructor(name, lastname ){
        this.name = name;
        this.lastname = lastname;
        this.books = [];
        this.mascotas = [];
    }

    getFullName(){
         return `${this.name} ${this.lastname}`;
    }

    addMascota(nameMascota){
        this.mascotas.push(nameMascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBooks(nameBook, authorBook){
        this.books.push({nombre:nameBook, autor:authorBook})
    }

    getBooksName(){
        return this.books.map((book) => book.nombre)
    }

    getBooks(){
        return this.books;
    }
}

const usuario = new Usuario("Jose", "Perez");
usuario.addMascota("Perro");
usuario.addMascota("Gato");
console.log(usuario.getFullName());
console.log(usuario.countMascotas());
usuario.addBooks("Las aventuras de Alicia en el país de las maravillas", "Lewis Carroll");
usuario.addBooks("El cuervo", "Edgar Allan Poe");
console.log(usuario.getBooksName());
console.log(usuario.getBooks());