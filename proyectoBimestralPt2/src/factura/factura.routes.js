import { Router } from "express";
import { generateFactura,updateFacture,getFactura } from "./factura.controller.js";
import { validateJwt,isAdmin } from "../../middlewares/validate.jwt.js";

const api = Router()

api.get('/generateFactura',[validateJwt],generateFactura)
api.get('/getFactura',[validateJwt,isAdmin],getFactura)
api.put('updateFactura',[validateJwt,isAdmin],updateFacture)

export default api