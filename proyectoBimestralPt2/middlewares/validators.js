//Validar campos en las rutas
import { body } from "express-validator"
import { validateErrors, validateErrorsWithoutFiles } from "./validate.errors.js"
import { existEmail, existUsername, notRequiredField, objectIdValid } from "../utils/db.validators.js"

//Arreglo de validaciones (por cada ruta)
export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
        body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min: 8})
        .withMessage('Password need min characters'),
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

export const updateUserValidator = [
    body('username')
        .optional() //Parámetro opcional, puede llegar como no puede llegar
        .notEmpty()
        .toLowerCase()
        .custom((username, { req })=> existUsername(username, req.user)),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, {req})=> existEmail(email, req.user)),
    body('password')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('role')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    validateErrorsWithoutFiles 
]

export const productsValidator = [
    body('name','Name cannot be empty')
        .notEmpty().toLowerCase(),
    body('description','Description cannot be empty')
        .notEmpty(),
    body('price','Price cannot be empty')
       .notEmpty(),
    body('category','Category cannot be empty')
        .notEmpty(), 
    body('stock','stock cannot be empty')
        .notEmpty(),
        validateErrors
]

export const productsUpdateValidator=[
    body('name','Name cannot be empty')
        .notEmpty().notEmpty().toLowerCase(),
    body('description','Description cannot be empty')
        .optional().notEmpty(),
    body('price','Price cannot be empty')
        .optional().notEmpty(),
    body('category','Category cannot be empty')
        .optional().notEmpty(), 
    body('stock','stock cannot be empty')
        .optional().notEmpty(),
        validateErrors
]