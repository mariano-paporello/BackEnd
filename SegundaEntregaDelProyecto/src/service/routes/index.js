const { Router } = require('express');
const productsRouter = require('./product');
const cartRoutes = require('./cart');

const router = Router();

router.use('/products', productsRouter);
router.use('/cart', cartRoutes);
module.exports= router;
