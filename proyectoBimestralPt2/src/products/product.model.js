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
            
        }


    }
)