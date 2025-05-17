import { Request, Response, NextFunction } from "express";

export function authorizeAccess(
  allowedRoles?: string[],
  allowedUserTypes?: string[]
) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    // Se allowedRoles foi passado e não inclui o role do usuário, bloqueia
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: "Forbidden: You do not have the required role" });
      return;
    }

    // Se allowedUserTypes foi passado e não inclui o userType do usuário, bloqueia
    if (allowedUserTypes && allowedUserTypes.length > 0 && !allowedUserTypes.includes(req.user.userType)) {
      res.status(403).json({ error: "Forbidden: You do not have the required user type" });
      return;
    }

    next();
  };
}
