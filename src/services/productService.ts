import { IProduct, productModel } from "../models/ProductModels";

export const getAllProducts = async ()=>{
    const products = await productModel.find();
    return products;
};

export const seedInitalProducts =async ()=>{
const products  =[
 {title:"HP laptop" , image:"data:image/jpeg;base64,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" , price:5800, stock:11},
 
];
const exsisingProducts =await  getAllProducts();
if(exsisingProducts.length === 0)
{
    productModel.insertMany(products);
}
};