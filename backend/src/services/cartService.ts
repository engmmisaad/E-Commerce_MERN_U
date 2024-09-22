import { cartModel, ICart, ICartItem } from "../models/cartModels";
import { IOrderItem, orderModel } from "../models/OrderModels";
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

  await product.save()
  cart.items.push({product:productId,unitPrice:product.price,qty:qty});

  cart.totalAmount+=product.price*qty;
  
  const updatedCart = await cart.save();
  return {data:updatedCart , statusCode:200}
};

interface UpateItemToCart{
  userId:string;
  productId : any,
  qty:number;
}
export const updateItemToCart=async ({userId, productId,qty}:UpateItemToCart)=>{
  const cart =await getActiveCartForUser({userId})

  const existInCart =  await cart.items.find((p)=>
    p.product.toString() === productId
  
  );
  if(!existInCart)
    {
      return {data:"item does not exist in the cart", statusCode:400};
    }
    const product = await productModel.findById(productId);
  
  if(!product)
  {
    return {data:"product not exist", statusCode:400};
  }
 
  if(product.stock+existInCart.qty<qty)
  {
    return {data:"stock less than qty" , statusCode:400}
  }
    existInCart.qty=qty;
    const otherCartItems = cart.items.filter((p)=>p.product.toString() !== productId);
   let total =calculateTotalItemsAmount({cartItems:otherCartItems});
    total+=existInCart.qty*existInCart.unitPrice;
    cart.totalAmount=total;
   
    const updatedCart = await cart.save();
    return {data: updatedCart, statusCode:200}
};

interface deleteItemFromCart{
  userId:string;
  productId : any
}
 
export const deleteItemFromCart=async ({userId, productId}:deleteItemFromCart)=>{
  const cart =await getActiveCartForUser({userId})

  const existInCart =  await cart.items.find((p)=>
    p.product.toString() === productId
  
  );
  if(!existInCart)
    {
      return {data:"item does not exist in the cart", statusCode:400};
    }
    const otherCartItems = cart.items.filter((p)=>p.product.toString() !== productId);

    const total=calculateTotalItemsAmount({cartItems:otherCartItems});
    cart.items=otherCartItems;
    cart.totalAmount=total;
    const updatedCart = await cart.save();
    return {data: updatedCart, statusCode:200}

};



const calculateTotalItemsAmount=({cartItems}:{cartItems:ICartItem[]})=>{
  

  let total = cartItems.reduce((sum,product)=>{
    sum+=product.qty*product.unitPrice
    
    return sum;
   
  },0);
  return total;
}
interface clearCart{
  userId:string;
  
}
export const clearCart= async ({userId}:clearCart)=>{
  const cart =await getActiveCartForUser({userId})
  cart.items=[]
  cart.totalAmount=0
  const updateCart = await cart.save()
  return {data: updateCart, statusCode:200}
}

interface CartCheckout{
  userId:string,
  address:string
}
export const cartCheckout= async({userId , address}:CartCheckout)=>{
  if(!address)
  {
    return {data:"please enter the clint address" , statusCode:400}
  }

  const cart =await getActiveCartForUser({userId})

const orderItems:IOrderItem[]=[];
  for (const item of cart.items)
  {
     const product = await productModel.findById(item.product)
     if(!product)
     {
      return {data:"product not exist" , statusCode:400}
     }
     const orderItem: IOrderItem= {
      productId:item.product.toString(),
      productName:product.title,
       productImage:product.image,
       unitPrice:item.unitPrice,
       qty:item.qty
     }
     orderItems.push(orderItem);
  }
  
  const order = await orderModel.create({
    orderItems:orderItems,
    total: cart.totalAmount,
    address: address,
    userId:userId
  });
  await order.save();
  cart.status="completed";
  await cart.save();
  return {data:order , statusCode:201}
}

