import { userModel } from "../models/userModels";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

interface registerParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: registerParams) => {
  const userFound = await userModel.findOne({ email });
  if (userFound) {
    return  { data: "error:user already exsist !",statusCode:400 } ;
  }
  const hashedPassword =await bcrypt.hash(password,10);
  const newUser = new userModel({ firstName, lastName, email, password:hashedPassword });
  await newUser.save();
  return {data:generateJWT({firstName,lastName,email}) , statusCode:200};
};

interface loginParams{
    email:string;
    password:string;
}

export const login= async({email,password}:loginParams)=>{
const userFound = await userModel.findOne({email});
if(userFound)
{
    const passwordCheck= await bcrypt.compare(password,userFound.password);
  if(passwordCheck)
  {
    return {data:generateJWT({email,firstName:userFound.firstName,lastName:userFound.lastName}) , statusCode:200};
  }
  else{
    return { data: "error:password not correct !",statusCode:400 } ;
  }
}
else
{
    return { data: "error:user not exsist !",statusCode:400 } ;
}
}
const generateJWT= (data:any)=>{
    return jwt.sign(data,"krvNb1hNjsMzksGsj8neXePhlkamLSQY");
};
