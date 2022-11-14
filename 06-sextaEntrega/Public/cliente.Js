const socket = io()

socket.on('bienvenidaAUsuario', (data) => {
    console.log("Bienvenido Usuario")
})

// Products Form
const form = document.getElementById("productsForm")
const title = document.getElementById("titulo")
const precio = document.getElementById("price")
const thumbnail = document.getElementById("thumbnail")

form.addEventListener("submit", (ev) => {
    ev.preventDefault()
    if(!title.value || !price.value || !thumbnail.value) {
      throw new Error("Campos incompletos , media pila :|")
  }else{
    const nuevoProducto = {
        title: title.value,
        price: precio.value,
        thumbnail: thumbnail.value
    }
    socket.emit("enviarNuevoProducto", nuevoProducto)
  }
})

// Table of Products
const divOfProducts = document.getElementById('listaDeProductos')
const noProductos = document.getElementById("noProductos")


socket.on("productosArray", data => {
    const newTr = document.createElement('tr')
    newTr.innerHTML = `
    <td>
      ${data.id}
    </td>
    <td>
      ${data.title}
    </td>
    <td>
    ${data.price}
    </td>
    <td>
     <img class="image-table rounded" src=${data.thumbnail} alt=""> 
    </td>
   `;
   console.log(newTr.innerHTML)

    divOfProducts.appendChild(newTr)
  if(noProductos.innerHTML){
    noProductos.innerHTML=""
  }
})

// Users Form
const nombreUser = document.getElementById('nombreUser')
const gmailUser = document.getElementById('gmailUser')
const userForm = document.getElementById('userForm')



userForm.addEventListener("submit", (ev)=>{
  ev.preventDefault()
  if(!nombreUser.value || !gmailUser.value) {
    throw new Error("Campos incompletos , media pila :|")
  }else{
    const nuevoUser = {
      nombre: nombreUser.value,
      email: gmailUser.value
    }
    socket.emit('enviarNuevoUser', nuevoUser)
    socket.on('UsuarioConfirmadoYGuardado', data=>{
      if(data){
        // Divs de Parte de chat
        const divIngreso = document.getElementById('formDeIngreso')
        const divChat = document.getElementById('chat')
        divIngreso.classList.add('esconder') 
        divChat.setAttribute('id', 'mostrar')

        // Mensajes Form
        const mensajesForm = document.getElementById('formForUsuarioName')
        const general = document.getElementById('fgen')
        
        mensajesForm.addEventListener('submit', ev=>{
          ev.preventDefault()
          if( !general.value || general.value === '...' ){
              throw new Error('Campos Incompletos')
          }
          const mensajeGeneral = {
             ...data,
              mensajeGeneral: general.value
          }

          socket.emit('enviarMensaje', mensajeGeneral)
          general.value = ''


          

      })
      }
      else{
        throw new Error('Error')
      }
     
    })
    socket.on('imprimirMensaje', data=>{
      const p = document.createElement('p')
       p.innerText=`${data.mensajeGeneral}`
       mensajesDiv.appendChild(p)
   })
  }
})



