import mongoose, { ObjectId, Schema,Document } from "mongoose";
import { IProduct } from "./ProductModels";

const cartStatusEnum=["active", "completed"]

export interface ICartItem extends Document{
    product:IProduct;
    unitPrice:number;
    qty:number;
}

export interface ICart extends Document{
 userId:ObjectId | string;
 items:ICartItem[];
 totalAmount:number;
 status:string;
}

const cartItemSchema = new Schema<ICartItem>({
    product: {type:Schema.Types.ObjectId ,ref: "Product", required:true},
    unitPrice:{type:Number , required:true},
    qty:{type:Number , required:true}
});

const cartSchema = new Schema<ICart>({
    userId:{type:Schema.Types.ObjectId, ref:"User" , required:true},
    items: [cartItemSchema],
    totalAmount:{type:Number , required:true},
    status :{type:String , required:true, default:"active"}
});


export const cartModel = mongoose.model("Cart",cartSchema);