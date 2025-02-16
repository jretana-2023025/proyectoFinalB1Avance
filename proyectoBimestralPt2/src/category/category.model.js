import { Schema,model } from "mongoose";

const categorySchema = new Schema(
    {
        name: {
            type: String,
            //Mongo Validations (middleware | intermediario que valida el parámetro antes de guardar)
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characters`]
        },
        description:{
            type: String,
            required: [true, 'Description is required'],
            maxLength: [125, `Can't be overcome 125 characters`]
        }
    },
    {
        versionKey: false, //Deshabilitar el __v(Versión del documento)
        timestamps: true //Agrega propiedades de fecha (Fecha de creación y de ultima actualización)
    }
)

export default model('category', categorySchema)