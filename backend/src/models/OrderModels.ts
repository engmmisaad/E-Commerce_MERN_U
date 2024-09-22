import mongoose, {Document, ObjectId, Schema } from "mongoose"

export interface IOrderItem
{
    productId:string | ObjectId,
    productName:string,
    productImage:string,
    unitPrice:number,
    qty:number
}

interface IOrder extends Document{
    orderItems:IOrderItem[],
    total:number,
    address:string,
    userId:string | ObjectId
}

const OrderItemSchema = new Schema<IOrderItem>({
    productId: {type:Schema.Types.ObjectId ,ref: "Product", required:true},
    productName : {type:String , required:true},
    productImage:{type:String,required:true},
    unitPrice:{type:Number, required:true},
    qty:{type:Number , required:true}
})

const OrderSchema = new Schema<IOrder>
({
  userId:  {type:Schema.Types.ObjectId ,ref: "User", required:true},
  orderItems:[OrderItemSchema],
    total:{type:Number , required:true},
    address:{type:String , required:true}
})

export const orderModel = mongoose.model<IOrder>("Order",OrderSchema)
  


