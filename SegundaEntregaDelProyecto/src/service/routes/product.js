const {Router} = require('express')
const ProductMethods = require('../../controllers/productos')

const router = Router();

router.get('/', async (req,res)=>{
    const products = await ProductMethods.list()
    res.json({productos: products})
} );


router.get("/:id", async (req, res)=>{
    const idBuscado = req.params.id
    const productoEncontrado= await ProductMethods.list(idBuscado)
    res.json({msg: "Prodcuto Encontrado:" + productoEncontrado})
})

router.post('/', async(req,res)=>{
    const {title, price, description, image, admin,stock} = req.body
    const nuevoProducto = await ProductMethods.newProduct({
        title:title,
        price: price,
        description:description,
        image:image,
        admin:admin,
        stock:stock})
        res.json({nuevoProducto: nuevoProducto})
} );

router.put('/:id', (req,res)=>{
    const idBuscado= req.params.id
    const objetoUpdate= req.body
    ProductMethods.updateOne(idBuscado, objetoUpdate)
    res.json({msg:"Producto con id: "+idBuscado+ " actualizado"})
} );


router.delete('/:id', (req,res)=>{
    const idBuscado= req.params.id
    ProductMethods.deleteOne(idBuscado)
    res.json({msg:"Se borró prodcuto con id: "+idBuscado})
})

module.exports= router;
