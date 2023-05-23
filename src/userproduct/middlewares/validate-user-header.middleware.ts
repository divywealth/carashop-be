import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express"

@Injectable()
export class ValidateHeader implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log("hi i am validate");
        const { authorization } = req.headers;
        if(!authorization) {
            return res.status(403).send({error: 'No Authentication Token provided in headers'})
        }else {
            next()
        }
    }
    
}