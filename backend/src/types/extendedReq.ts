import { Request } from "express";
export interface ExtendedReq extends Request {
    user?: any;
  }