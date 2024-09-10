import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModels";
export interface ExtendedReq extends Request {
  user?: any;
}

export const validateJWT = (req: ExtendedReq, res: Response, next: NextFunction) => {
  const autherationheader = req.get("authorization");
  if (!autherationheader) {
    return res.status(403).send("authorization header not provided");
  }
  const token = autherationheader.split(" ")[1];
  if (!token) {
    return res.status(403).send("bearer token not found");
  }
  jwt.verify(token, "krvNb1hNjsMzksGsj8neXePhlkamLSQY", async(err, payload) => {
    if (err) {
      return res.status(403).send("invalid token");
    }
    if (!payload) {
      return res.status(403).send("invalid payload token");
    }
    const userPayload = payload as {
        email:string,
        firstName:string,
        lastName:string
    }
    const user = await userModel.findOne({email:userPayload.email});
    req.user= user;
    next();

  });
};
