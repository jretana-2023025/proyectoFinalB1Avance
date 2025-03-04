import { Router } from "express";
import { saveProduct,
    getAllProducts,
    getOneProduct,
    getByStock,
    mostSelled,
    updateProduct,
    deleteProduct,
  } from "./product.controller.js";

import { validateJwt, isAdmin } from "../../middlewares/validate.jwt.js";
import { productsUpdateValidator,productsValidator } from "../../middlewares/validators.js";
    const api = Router()

api.post('/saveProduct',[validateJwt,isAdmin,productsValidator], saveProduct)
api.get('/getAllProducts',[validateJwt], getAllProducts)
api.get('/getOneProduct',[validateJwt],getOneProduct)
api.get('/mostSelled/mostselledProducts',[validateJwt],mostSelled)
api.get('/getByStock',[validateJwt],getByStock)
api.put('/updateProduct',[validateJwt,isAdmin,productsUpdateValidator], updateProduct)
api.delete('/delete/:id',[validateJwt,isAdmin,productsUpdateValidator],deleteProduct)

export default api