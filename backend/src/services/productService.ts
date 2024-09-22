import { IProduct, productModel } from "../models/ProductModels";

export const getAllProducts = async ()=>{
    const products = await productModel.find();
    return products;
};

export const seedInitalProducts =async ()=>{
const products  =[
 {title:"HP laptop" , image:"data:image/jpeg;" , price:5800, stock:11},
 
];
const exsisingProducts =await  getAllProducts();
if(exsisingProducts.length === 0)
{
    productModel.insertMany(products);
}
};