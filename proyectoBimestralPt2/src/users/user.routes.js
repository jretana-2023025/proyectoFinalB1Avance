import { Router } from "express"
import { 
    getAll, 
    get, 
    updateUser,
    deleteUser
} from "./user.cotroller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { updateUserValidator } from "../../middlewares/validators.js"

const api =Router()

api.get(
    '/getUser', 
    getAll
)
api.get(
    '/getUserById/:id', 
    get
)
api.put(
    '/updateUser/:id', 
    [
        validateJwt, 
        updateUserValidator
    ], 
    updateUser
)

api.delete('/delate/:id', [validateJwt],deleteUser)

export default api