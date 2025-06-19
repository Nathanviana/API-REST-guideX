// import * as express from "express";
import { JwtPayload } from "../../services/auth.service";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};