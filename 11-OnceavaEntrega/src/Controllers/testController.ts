import {faker} from "@faker-js/faker"
export const crear5Productos= ()=>{
    const respuesta: any = [];

    for(let i =0; i<5; i++){
        respuesta.push({
            id: Math.floor(Math.random()*40),
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        })
    }
    return respuesta
}
