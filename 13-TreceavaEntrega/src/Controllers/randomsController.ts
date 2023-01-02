
const  randomCreator = (cantidad)=>{
for(let i=0;i<cantidad;i++){
    const list = {}
     let numberKey = Math.round(Math.random()*(cantidad-1)+1)
     if(numberKey in list){
        list[numberKey]++
     }else{
        list[numberKey]=1
     }
     return list
}
}
process.on('message', (msg:any)=>{
    msg = JSON.parse(msg);
  if (msg.msg == 'start') {
    console.log('Start Process');
    const result = randomCreator(msg.cantidad);
    if (process && process.send) {
      process.send(result);
    }
  }
})