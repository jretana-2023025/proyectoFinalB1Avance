import {Schema,model}from "mongoose"

const productSchema = new Schema(
    {
        name:{
            type: String,
            required:[true,'Name is required'],
            maxLength:[25, `Can' be overcome 25 characters`]
            
        },
        description:{
            type:String,
            required:[true,'Description is required'],
            maxLength:[125,`Can't be overcome 125 characters`]
        },
        price:{
            type:Number,
            required:[true,'price is required']
            
        },
        category:{
            type:Schema.Types.ObjectId,
            ref:'category',
            required:[true,'Category is required']
        },
        stock:{
            type:Number,
            required:[true,'Stock is required'],
            maxLength:[55, `Can't be overcome 55 characters`]
        },
        updateCount:{type:Number, default:0}


    },
    {
        versionKey: false,
        timestamps: true 
    }
)

export default model('Product',productSchema)