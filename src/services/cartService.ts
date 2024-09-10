import { cartModel } from "../models/cartModels";

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
