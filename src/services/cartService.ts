import { cartModel } from "../models/cartModels";
import { productModel } from "../models/ProductModels";

interface ICreateCartForUser {
  userId: string;
}

interface IGetAtvieCart {
  userId: string;
}

const createCartForUser = async ({ userId }: ICreateCartForUser) => {
  const cart = await cartModel.create({ userId: userId, totalAmount:0});
  await cart.save();
  return cart;
};

export const getActiveCartForUser = async ({ userId }: IGetAtvieCart) => {
    let cart = await cartModel.findOne({userId,status:"active"});
  
    if(!cart)
    {
        cart=await createCartForUser({userId});
    }
    return cart;
};
interface AddItemToCart{
  userId:string;
  productId : any,
  qty:number;
}
export const addItemToCart=async ({userId, productId,qty}:AddItemToCart)=>{
  const cart =await getActiveCartForUser({userId})

  const existInCart =  await cart.items.find((p)=>
    p.product.toString() === productId
  
  );
  console.log(existInCart)
  if(existInCart)
  {
    return {data:"items already exist in the cart", statusCode:400};
  }
  
  const product = await productModel.findById(productId);
  
  if(!product)
  {
    return {data:"product not exist", statusCode:400};
  }
  if(product.stock<qty)
  {
    return {data:"stock less than qty" , statusCode:400}
  }
  product.stock-=qty
  await product.save()
  cart.items.push({product:productId,unitPrice:product.price,qty:qty});
  cart.totalAmount+=product.price*qty;
  
  const updatedCart = await cart.save();
  return {data:updatedCart , statusCode:200}
};
