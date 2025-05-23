import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
        role: string;
        userType: string;
      };
    }
  }
}
