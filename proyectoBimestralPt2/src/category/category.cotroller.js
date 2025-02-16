'use strict'

import Category from './category.model.js'
import User from '../users/user.model.js'


export const saveCategory = async(req, res) => {
    const data = req.body
    try {
        //Validamos que exista el cuidador y que sea tipo admin
        
        //data.keeper = req.user.uid
        const category = new Category(data)
 
        await category.save()
        return res.send(
            {
                success: true,
                message: `${category.name} saved successfully`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding category',
                err
            }
        )
    }
}
export const getAllCategory = async (req,res) => {
    try {
       const {limit = 20, skip = 0} = req.query
       
       const category = await Category.find()
        .skip(skip)
        .limit(limit)

        if(category.length===0){
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
                message:'category found: ',
                category
            }
        )
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: 'general error in getAllCategory',error})
    }
}


export const getOne = async (req, res) => {
    try {
        let {id} =req.params
        let category = await Category.findById(id)

        if(!category) return res.status(404).send(
            {
                success: false,
                message: 'category not found'
            }
        )

        return res.send(
            {
                success: true,
                message: 'Category found: ',
                category
            }
        )
        
    } catch (error) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error in getOne', 
                err
            }
        )
    }
}

export const updateCategory = async(req, res)=>{
    try{
        const { id } = req.params

        const data = req.body

        const update = await Category.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'category not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'category updated',
                category: update
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error in updateCategory', 
                err
            }
        )
    }
}

export const deleteCategory = async(req, res)=>{
    try{
        const { id } = req.params

        const data = req.body

        const update = await Category.findByIdAndDelete(
            id,
            data,
            {new: true}
        )

        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'category not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'category deleted successfully',
                category: update
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error in deleteCategory', 
                err
            }
        )
    }
}