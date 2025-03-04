import Factura from "./factura.model.js"
import Carrito from "../carrito/carrito.model.js"
import Product from '../products/product.model.js'

export const generateFactura = async (req,res) => {
    try {
        let carritoC = await Carrito.findOne({user:req.user.uid})
        if(carritoC.products.length == 0) return res.send({
           message: 'Your carrito has no products' 
        })
        let factura = new Factura(
            {
                facturaNumber: Math.floor(Math.random()*99999),
                client: req.user.uid,
                products: carritoC.products,
                total: carritoC.total + carritoC.total*0.12,
                description: `Here is your proof o payment `
            }
        )
        for (let i = 0; i<factura.products.length; i++){
            let idproduct = factura.products[i].product._id
            let quantity = factura.products[i].quantity
            let product = await Product.findByIdAndUpdate(idproduct)
            if(product.stock<quantity){
                factura.status = false
                return res.send({message:`Here is the products you were taken ${product.stock}`})
            }
            if(product){
                product.updateCount +=1
                product.stock -=quantity
                await product.save()
            }
            factura.save()

        }
        carritoC.product=[]
        carritoC.total = 0
        
        await carritoC.save()
        return res.send({message: 'Factura:',factura})
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with generateFactura',
                err
            }
        )
    }
}


export const updateFacture = async (req,res) => {
    try {
        let id = req.body.id
        let dataA = req.body.product
        let dataB = parseInt(req.body.quantity)
        let numeroDeProducto = req.body.numeroDeProducto
        let factura = await Factura.findById(id)
        if(!factura) return res.send({message:'Factura no encontrada'})
            let newQuantity = parseInt(factura.products[numeroDeProducto].quantity+(dataB))
            if(newQuantity<0)return res.send({message:'You can not remove mor than you on your cart'})
        factura.products[numeroDeProducto].set({product:dataA,quantity:newQuantity})
        let product = await Product.findOne({_id:factura.products[numeroDeProducto].product._id})
        if(newQuantity>product.stock) return res.send({message:`the actual product stock is: ${product.stock}`})

        product.stock = product.stock -(dataB)
        product.save()
        factura.status =true
        factura.total += product.price*(dataB)
        factura.save()
        return res.send(
            {
                message:'tu nueva factura ',
                factura
            }
        )
 
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with updateFacture',
                err
            }
        ) 
    }
}

export const getFactura = async (req,res) => {
    try {
        let myFactura = await Factura.find({client: req.user.uid}).populate('client','name-_id')
        .populate('products.product','name price description -_id')
        
        return res.send({message: 'Tus facturas',myFactura})
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with getFactura',
                err
            }
        ) 
    }
    
}