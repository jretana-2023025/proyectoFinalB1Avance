import { Router } from "express";
import { getCarrito,updateCarrito } from "./carrito.controller.js";

import { validateJwt,isClient } from "../../middlewares/validate.jwt";
const api = Router()

api.get('/getCarrito',[validateJwt,isClient],getCarrito);
api.put('/updateCarrito',[validateJwt,isClient],updateCarrito);

export default api