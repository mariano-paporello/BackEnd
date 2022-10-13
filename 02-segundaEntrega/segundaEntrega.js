const fs = require("fs");
const rutaArchivo = "./productos.txt";
const funcionEscritora = async (dataParaEscribir) => {
  const finalData = JSON.stringify(dataParaEscribir);
  await fs.promises.writeFile(rutaArchivo, finalData, (error) => {
    if (error) {
      throw new Error(error);
    }
  });
};


class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }
   save(object) {
    if (typeof object === "object") {
       fs.readFile(rutaArchivo, "utf-8", (err, data) => {
        if (err) {
          throw new Error(err);
        }
        if (data.length === 0) {
          const newData = [{ ...object, id: 1 }];
          funcionEscritora(newData);
          return console.log("Se añadio un producto");
        } else {
          const dataObject = JSON.parse(data);
          const newData = [
            ...dataObject,
            { ...object, id: dataObject[dataObject.length - 1].id + 1 },
          ];
          funcionEscritora(newData);
          console.log("Se añadio un producto");
        }
      });
    } else {
      throw new Error("Tenes que mandar un objeto panflin");
    }
  }

  async getById(id) {
    await fs.readFile(rutaArchivo, "utf-8", (error, data) => {
      if (error) {
        throw new Error(error);
      }
      if (data.length != 0) {
        const dataObject = JSON.parse(data);
        const objetoEncontrado = dataObject.filter(
          (element) => element.id === id
        );
        if (objetoEncontrado.length === 0) {
          console.log(
            `No se a podido encontrar ningun objeto con el id Seleccionado`
          );
        } else {
          const objetoTraducido = JSON.stringify(objetoEncontrado);
          console.log(`El objeto encontrado fue: ${objetoTraducido}`);
        }
      } else {
        console.log("No hay nada dentro del archivo get id");
      }
    });
  }

  async getAll() {
    await fs.readFile(rutaArchivo, "utf-8", (error, data) => {
      if (error) {
        throw new Error(error);
      }
      if (data.length != 0) {
        const dataObject = JSON.parse(data);
        console.log(dataObject);
      } else {
        console.log("No hay nada dentro del archivo get all");
      }
    });
  }

  async deleteById(number) {
    await fs.readFile(rutaArchivo, "utf-8", (error, data) => {
      if (error) {
        throw new Error(error);
      }
      if (data.length != 0) {
        const dataObject = JSON.parse(data);
        const arraySinObjeto = dataObject.filter(
          (element) => element.id != number
        );
        funcionEscritora(arraySinObjeto);
        console.log(`SE BORRO UN OBJETO CON ID: ${number}`);
      } else {
        console.log("No hay nada dentro del archivo delete id");
      }
    });
  }

   deleteAll() {
    setTimeout(async ()=>{
      await fs.promises.writeFile(rutaArchivo, "", (err) => {
        if (err) {
          throw new Error(err);
        }
        
      });
    }, 1000)
    console.log("Se a Borrado Todo dentro del archivo");
  }
}


const nuevoContenedor = new Contenedor("productos.txt");
nuevoContenedor.save({title:'BOCA', price: "$55", thumbnail: "randomURL"})
// nuevoContenedor.getById(1)
// nuevoContenedor.getAll()
// nuevoContenedor.deleteAll()
// nuevoContenedor.deleteById(4)

// Descomentar los metodos mietras se van probando. Ya que si se ejecutan todos al mismo tiempo, se van a mezclar debido a que no son sincronicos.