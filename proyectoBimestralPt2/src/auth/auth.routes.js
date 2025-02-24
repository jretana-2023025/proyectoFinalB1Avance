import  Router  from "express"
import { 
    login,
    registerCliente,
    registerAdmin
} from "./auth.controller.js"
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { registerValidator } from "../../middlewares/validators.js"

const api = Router()

api.post(
    '/registerCliente',[registerValidator],
    registerCliente
)

api.post(
    '/registerAdmin',[registerValidator],
    registerAdmin
)

api.post('/login', login)

export default api