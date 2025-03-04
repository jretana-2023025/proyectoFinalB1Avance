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