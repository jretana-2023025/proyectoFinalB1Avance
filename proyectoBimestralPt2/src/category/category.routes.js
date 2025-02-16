import { Router } from "express";

import{
    saveCategory,
    getAllCategory,
    getOne,
    updateCategory,
    deleteCategory
}from './category.cotroller.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'


const api = Router()

api.post('/addCategory',validateJwt,isAdmin,saveCategory)
api.get('/getAllCategory',getAllCategory)
api.get('/getOne/:id',getOne)
api.put('/updateCategory/:id',validateJwt,isAdmin,updateCategory)
api.delete('/deleteCategory/:id',validateJwt,isAdmin,deleteCategory)

export default api