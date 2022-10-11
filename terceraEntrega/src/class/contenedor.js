import fs from "fs"

const txtPath = "./assets/productos.txt"

const funcionEscritora = async (dataParaEscribir) => {
  const finalData = JSON.stringify(dataParaEscribir);
  await fs.promises.writeFile(`./${txtPath}`, finalData, (error) => {
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
     fs.readFile(`./${this.nombreArchivo}`, "utf-8", (err, data) => {
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

 getById(id) {
   fs.readFile(`./${this.nombreArchivo}`, "utf-8", (error, data) => {
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

 getAll() {
   fs.readFile(`./${this.nombreArchivo}`, "utf-8", (error, data) => {
    if (error) {
      throw new Error(error);
    }
    if (data.length != 0) {
      const dataObject = JSON.parse(data);
      return dataObject
    } else {
      console.log("No hay nada dentro del archivo get all");
    }
  });
}

 deleteById(number) {
   fs.readFile(`./${this.nombreArchivo}`, "utf-8", (error, data) => {
    if (error) {
      throw new Error(error);
    }
    if (data.length != 0 ) {
      const dataObject = JSON.parse(data);
      const arraySinObjeto = dataObject.filter(
        (element) => element.id != number
      );
      if(arraySinObjeto.length===dataObject.length){
          console.log("No hay un objeto con ese Id")
      }else{
          funcionEscritora(arraySinObjeto);
          console.log(`Se a borrado un obj con id:${number}`)
      }
    } else {
      console.log("No hay un objeto con ese Id");
    }
  });
}

 deleteAll() {
  setTimeout(async ()=>{
    await fs.promises.writeFile(`./${this.nombreArchivo}`, "", (err) => {
      if (err) {
        throw new Error(err);
      }
      
    });
  }, 1000)
  console.log("Se a Borrado Todo dentro del archivo");
}
}

export default Contenedor