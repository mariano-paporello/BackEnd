const socket = io()
socket.on('bienvenidaAUsuario',(data)=>{
    // socket.emit('notificacion', 'mensaje recibido correctamente')
})

const form = document.getElementById('formForUsuarioName')
const general = document.getElementById('fgen')
const generalParrafo = document.getElementById('parrafoDeGeneral')
const chatDiv = document.getElementById('chat')

form.addEventListener('submit', ev=>{
    ev.preventDefault()
    if( !general.value || general.value === '...' ){
        throw new Error('Campos Incompletos')
    }
    const mensajeGeneral = {
        mensajeGeneral: general.value
    }
    socket.emit('enviarMensajeGeneral', mensajeGeneral)
    general.value = ''
    personal.value=''
})


socket.on('mensajeGeneral', data=>{
   const p = document.createElement('p')
    p.innerText=`Mensaje General from userId: ${data.id} 
    Mensaje: ${data.mensajeGeneral}`
    console.log(data.style)
    p.style.color = `#${data.style}`
    chatDiv.appendChild(p)
})


