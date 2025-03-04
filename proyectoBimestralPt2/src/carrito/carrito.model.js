import { Schema } from "mongoose";

const carritoSchema = new Schema(
    {
        description:{
            type:String,
            maxLength:[100,'can not be overcome 100 characters']

        },
        user:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:[true,'User is required']
        },
        products:[
            {
                pruduct:{type:Schema.Types.ObjectId,ref:'Product'},
                quantity:{type: Number,default:1}
            }
        ],
        total:{
            type:Number,
            maxLength:[10,'can not overcome 10 characters'],
            default:0
        }

    }
)

export default model('Carrito',carritoSchema)
