
import { Request, Response, NextFunction} from "express";
type reqHandler= (req: Request, res: Response,next:NextFunction)=> Promise<any>

const asyncHandler = (fn:reqHandler):reqHandler=>{
    return async (req:Request, res:Response, next:NextFunction):Promise<any>=>{
        fn(req, res, next).catch(err => next(err));
    };
};

export {
    asyncHandler
}