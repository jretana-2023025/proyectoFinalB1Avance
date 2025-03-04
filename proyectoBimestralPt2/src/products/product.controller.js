'use strict';

import Product from './product.model.js'

export const saveProduct = async (req,res) => {
        const data = req.body
    try {
        const product = new Product(data)
        await product.save()

        return res.send(
            {
                success: true,
                message: `${product.name} saved successfully`
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with saveProduct',
                err
            }
        )
    }    
}


export const getAllProducts = async (req, res) => {
    try {
        const {limit = 20, skip = 0}= req.query
        const products =  await Product.find()
        .skip(skip)
        .limit(limit)

        if(products.length===0){
            return res.status(404).send(
                {
                    success: false,
                    message:'category not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message:'products found: ',
                products
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with getAllProducts',
                err
            }
        )
    }
}

export const getOneProduct = async (req,res) => {
    try {
        let {id}=req.params
        let product =await Product.findById(id)
        if(!product) return res.status(404).send(
            {
                success:false,
                message:'product not found'
            }
        )

        return res.send(
            {
                success: true,
                message:'products found: ',
                product
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with getOneProduct',
                err
            }
        )
    }
}


export const getByStock = async (req,res) => {
    try {
        let stock = await Product.find({stock:0})
        if(stock.length===0){
            return res.send(
                {
                    success:true,
                    message:'All products have units'
                }
            )
        }
        return res.send(
            {
                success:true,
                message:'Products out os stock',
                stock
            }
        )
      
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with getByStock',
                err
            }
        )
    }
}

export const mostSelled = async (req,res) => {
    try {
        let mostSelled = await Product.find({})
        .sort({updateCount:-1}).exec()
        return res.send(
            {
                success:true,
                message: 'These are the most selled products', 
                mostSelled
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with mostSelled',
                err
            }
        )
    }
}



export const updateProduct = async (req,res) => {
    try {
        const {id} = req.params
        const data = req.body

        const update = await Product.findByIdAndUpdate(
            
                id,
                data,
                {new: true}
            
        )

        if(!update )return res.status(404).send(
            {
                success:false,
                message:'Product not found'
            }
        )
        return res.send(
            {
                success:true,
                message:'pruduct updated',
                product: update
            }
        )

    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with updateProduct',
                err
            }
        )
    }
}

export const deleteProduct = async (req,res) => {
    try {
       let id = req.params.id
       let deleteProduct = await Product.findByIdAndDelete(id)
       if(!deleteProduct)return res.status(404).send(
        {
            success:false,
            message:'Product not found'
        }
       )
       return res.send(
        {
            success:true,
            message:`product deleted successfully ${deleteProduct.name}`
        }
       )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error with updateProduct',
                err
            }
        )
    }
    
}