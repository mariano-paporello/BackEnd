
export const  randomCreator = (cantidad:number)=>{
const list = {}
for(let i=0;i<cantidad;i++){
    
     let numberKey = Math.round(Math.random()*(1000))
     if(numberKey in list){
        list[numberKey]++
     }else{
        list[numberKey]=1
     }
     
}
return list
}
process.on('message', async (msg:any)=>{
   msg = JSON.parse(msg);
  if (msg.msg == 'start') {
    console.log('Start Process');
    const result = randomCreator(Number(msg.cantidad));
    if (process && process.send) {
      process.send(result);
    }
  }
})