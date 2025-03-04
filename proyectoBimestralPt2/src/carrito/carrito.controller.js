import Product from '../products/product.model.js'
import Carrito from './carrito.model.js'

export const getCarrito = async (req,res) => {
    try {
        const idUser = req.user.uid
        const carrito = await Carrito.findOne({user:idUser})
        .populate('user','name -_id')
        .populate({path:'products.product',select:'name description category -_id'})
        .populate('total')
        return res.send({message: 'This is your Cart',carrito})
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with agragarCarrito',
                err
            }
        )
    }
}

export const updateCarrito = async (req, res) => {
    try {
        const idUser = req.user.uid
        const idProduct = await req.body.product
        const quantity = parseInt(req.body.quantity,10)
        const product = await Product.findById(idProduct)
        
        if(!product)
            return res.send(
            {
                success:false,
                message:'The product does not exist'
            }
        )
        if(product.stock <=0)
            return res.send(
                {
                    success:false,
                    message:'this product is out of stock'
                }
            )
        if(product.stock < quantity)
            return res.send(
                {
                    message:`we only have this amount of products: ${product.stock}`
                }
            )

        const carritoW = await Carrito.findOne({user:idUser})
        if(!carritoW) return res.status(404).send({message:'Carrito no encontrado'})

        const existingProductIndex = carritoW.products.findIndex(p => p.product.toString()===idProduct)
        if(existingProductIndex !== -1){
            carritoW.products[existingProductIndex].quantity += quantity

            if(carritoW.products[existingProductIndex].quantity<0){
                return res.send({message:'you cannot request negative product'})
            }
            if(carritoW.products[existingProductIndex].quantity>product.stock){
                return res.send(
                    {
                        message:'We do not count with enough products'
                    }
                )
            }
        }else{
            carritoW.products.push({product:product._id,quantity})
        }

        const parcialTotal = carritoW.products.reduce((total,item)=>{
            const productPrice = product.price
            return (productPrice * quantity)
        },0)
        carritoW.total += parcialTotal

        await carritoW.save()

        return res.send(
            {
                message:'Product added to your carrito'
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with updateCarrito',
                err
            }
        )
    }
}