import { Schema, model } from "mongoose";
import { notRequiredField } from "../../utils/db.validators";

const facturaSchema = new Schema(
    {
        facturaNumber:{
            type:Number,
            required: [true,'FacturaNumber is required'],
            maxLength:[20,'can not be overcome 20 characters']
        },
        client:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:[true,'ClientId is required']
        },
        products:[
            {
                product:{type: Schema.Types.ObjectId,ref:'Product'},
                quantity:{type:Number,default:1}
            }
        ],
        description:{
            type:String,
            required: [true,'Description is required'],
            maxLength:[100,'Can not overcome 100 characters']
        },
        status:{
            type:Boolean,
            default:true

        }
    }
)

export default model('Factura',facturaSchema)